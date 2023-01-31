import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyAction } from './myAction.entity';
import { CreateMyActionDto } from './dto/create-myaction-dto';
import { ActionService } from 'src/action/action.service';
import { AreaService } from '../area/area.service';

@Injectable()
export class MyActionService {
  constructor(
    @InjectRepository(MyAction)
    private myActionRepository: Repository<MyAction>,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => AreaService))
    private readonly areaService: AreaService,
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

  async findByLinkedFromId(actionId: string) {
    return await this.myActionRepository.findBy({ linkedFromId: actionId });
  }

  async addAction(areaId: string, action: CreateMyActionDto) {
    const actionIsPresent: boolean = await this.actionService.exist(action.actionId);
    if (!actionIsPresent) {
      throw NotFoundException('action');
    }
    const areaIsPresent: boolean = await this.areaService.exist(action.areaId);
    if (!areaIsPresent) {
      throw NotFoundException('area');
    }
    const newAction: MyAction = this.myActionRepository.create(action);
    return await this.myActionRepository.save(newAction);
  }

  async removeAction(actionId: string) {
    return await this.myActionRepository.delete({ uuid: actionId });
  }

  async removeByAreaId(areaId: string) {
    return await this.myActionRepository.delete({ areaId: areaId });
  }
}
