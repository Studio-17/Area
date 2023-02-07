import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyAction } from './myAction.entity';
import { CreateMyActionDto } from './dto/create-myaction-dto';
import { ActionService } from 'src/action/action.service';
import { AreaService } from '../area/area.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class MyActionService {
  constructor(
    @InjectRepository(MyAction)
    private myActionRepository: Repository<MyAction>,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => AreaService))
    private readonly areaService: AreaService,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async findAction(areaId: string) {
    const myActions = await this.myActionRepository.findBy({ areaId: areaId, linkedFromId: null });
    let resultAction = null;
    if (myActions.length) {
      const action = await this.actionService.findOne(myActions[0].actionId);
      resultAction = {
        actionId: action.uuid,
        name: action.name,
        serviceId: action.serviceId,
        myActionId: myActions[0].uuid,
      };
    }
    return resultAction;
  }

  async findReaction(areaId: string, actionId: string) {
    const myActions = await this.myActionRepository.findBy({
      areaId: areaId,
      linkedFromId: actionId,
    });
    const reactions = [];
    for (let i = 0; i < myActions.length; i++) {
      const action = await this.actionService.findOne(myActions[i].actionId);
      reactions.push({
        actionId: action.uuid,
        name: action.name,
        serviceId: action.serviceId,
        myActionId: myActions[i].uuid,
      });
    }
    return reactions;
  }

  async findAll(areaId: string) {
    const myActions = await this.myActionRepository.findBy({ areaId: areaId });
    const actions = [];
    console.log('myActions' + myActions.length);
    for (let i = 0; i < myActions.length; i++) {
      const action = await this.actionService.findOne(myActions[i].actionId);
      actions.push({ action: myActions[i], description: action });
    }
    console.log(myActions);
    console.log(actions);
    return actions;
  }

  async findByActionId(actionId: string) {
    return await this.myActionRepository.findBy({ actionId: actionId });
  }

  async findOne(myActionId: string, userId: string) {
    return await this.myActionRepository.findOneBy({ uuid: myActionId, userId: userId });
  }

  async findByLinkedFromId(actionId: string) {
    return await this.myActionRepository.findBy({ linkedFromId: actionId });
  }

  async addCron(actionId: string, timer: any, token, myActionId) {
    const action = await this.actionService.findOne(actionId);

    if (action.type === 'action') {
      await firstValueFrom(
        this.httpService
          .post<any>(
            `http://localhost:3000/api/reaccoon/actions/` + action.link + `cron`,
            {
              name: action.name + '-' + myActionId,
              ...timer,
            },
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(error, HttpStatus.BAD_REQUEST);
            }),
          ),
      );
    }
  }

  async addAction(areaId: string, action: CreateMyActionDto, userId: string, token) {
    const actionIsPresent: boolean = await this.actionService.exist(action.actionId);
    if (!actionIsPresent) {
      throw NotFoundException('action');
    }
    const areaIsPresent: boolean = await this.areaService.exist(areaId);
    if (!areaIsPresent) {
      throw NotFoundException('area');
    }
    const newAction: MyAction = this.myActionRepository.create({
      userId: userId,
      areaId: areaId,
      ...action,
    });
    const myNewAction: MyAction = await this.myActionRepository.save(newAction);
    this.addCron(
      action.actionId,
      { hour: action.hour, minute: action.minute, second: action.second },
      token,
      myNewAction.uuid,
    );
    return myNewAction;
  }

  async removeAction(actionId: string, userId: string) {
    const myAction = await this.findOne(actionId, userId);
    if (!myAction) {
      return;
    }
    const action = await this.actionService.findOne(myAction.actionId);
    if (action.type === 'action') {
      try {
        const cronJob = await this.schedulerRegistry.getCronJob(action.name + '-' + actionId);
        cronJob.stop();
      } catch (error) {}
    }
    return await this.myActionRepository.delete({ uuid: actionId, userId: userId });
  }

  async removeByAreaId(areaId: string, userId: string) {
    return await this.myActionRepository.delete({ areaId: areaId, userId: userId });
  }
}
