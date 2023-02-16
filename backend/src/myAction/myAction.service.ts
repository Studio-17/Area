import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyAction } from './myAction.entity';
import { CreateMyActionDto } from './dto/create-myaction-dto';
import { ActionService } from 'src/action/action.service';
import { AreaService } from '../area/area.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ActionType } from 'src/action/action.entity';
import { GoogleService } from 'src/externService/google/google.service';

@Injectable()
export class MyActionService {
  constructor(
    @InjectRepository(MyAction)
    private myActionRepository: Repository<MyAction>,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => AreaService))
    private readonly areaService: AreaService,
    @Inject(forwardRef(() => GoogleService))
    private readonly googleService: GoogleService,
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
        hour: myActions[0].hour,
        minute: myActions[0].minute,
        second: myActions[0].second,
        params: myActions[0].params,
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
        params: myActions[i].params,
      });
    }
    return reactions;
  }

  async findAll(areaId: string) {
    const myActions = await this.myActionRepository.findBy({ areaId: areaId });
    const actions = [];
    for (let i = 0; i < myActions.length; i++) {
      const action = await this.actionService.findOne(myActions[i].actionId);
      actions.push({ action: myActions[i], description: action });
    }
    return actions;
  }

  async findByActionId(actionId: string) {
    return await this.myActionRepository.findBy({ actionId: actionId });
  }

  async findByActionAndUserId(actionId: string, userId: string) {
    return await this.myActionRepository.findBy({ userId: userId, actionId: actionId });
  }

  async findOne(myActionId: string, userId: string) {
    return await this.myActionRepository.findOneBy({ uuid: myActionId, userId: userId });
  }

  async findByLinkedFromId(actionId: string) {
    return await this.myActionRepository.findBy({ linkedFromId: actionId });
  }

  availableActions = new Map([
    ['google/check-mail/', this.googleService.addCron.bind(this.googleService)],
  ]);

  async addCron(
    actionId: string,
    timer: any,
    myActionId: string,
    userId: string,
    params: { name: string; content: string }[],
  ) {
    // token
    const action = await this.actionService.findOne(actionId);

    if (action.type === 'action') {
      this.availableActions.get(action.link)({
        name: action.name + '-' + myActionId,
        userId: userId,
        ...timer,
        params: params,
      });
    }
  }

  async addAction(areaId: string, action: CreateMyActionDto, userId: string) {
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
      // token,
      myNewAction.uuid,
      userId,
      myNewAction.params,
    );
    return myNewAction;
  }

  async removeCron(actionId: string, userId: string) {
    const myAction = await this.findOne(actionId, userId);
    if (!myAction) {
      return;
    }
    const action = await this.actionService.findOne(myAction.actionId);
    if (action.type === 'action') {
      try {
        const cronJob = await this.schedulerRegistry.getCronJob(action.name + '-' + myAction.uuid);
        cronJob.stop();
      } catch (error) {}
    }
  }

  async removeAction(actionId: string, userId: string) {
    this.removeCron(actionId, userId);
    return await this.myActionRepository.delete({ uuid: actionId, userId: userId });
  }

  async removeByAreaId(areaId: string, userId: string) {
    const myActions = await this.findAll(areaId);
    for (const myAction of myActions) {
      this.removeCron(myAction.uuid, userId);
    }
    return await this.myActionRepository.delete({ areaId: areaId, userId: userId });
  }

  async generateAllCrons() {
    const allActions = await this.actionService.findByType(ActionType.ACTION);
    for (const action of allActions) {
      const myActions = await this.findByActionId(action.uuid);
      for (const myAction of myActions) {
        this.addCron(
          action.uuid,
          { hour: myAction.hour, minute: myAction.minute, second: myAction.second },
          // myAction.token,
          myAction.uuid,
          myAction.userId,
          myAction.params,
        );
      }
    }
  }
}
