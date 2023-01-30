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
    const myNewAction = await this.myActionRepository.save(newAction);
    console.log(newAction);
    this.myActionRepository.findBy({ areaId: areaId }).then((areas) => {
      if (areas.length) {
        for (let i = 0; i < areas.length; i++) {
          if (!areas[i].linkedToId) {
            this.myActionRepository
              .update({ uuid: areas[i].uuid }, { linkedToId: myNewAction.uuid })
              .catch((e: any) => {
                console.error(e);
                throw NotFoundException('my action');
              });
            newAction.linkedFromId = areas[i].uuid;
            break;
          }
        }
      }
    });
    return await this.myActionRepository.save(newAction);
  }

  async removeAction(actionId: string) {
    let linkedTo = null;
    let linkedFrom = null;
    const action = await this.myActionRepository
      .findOneByOrFail({ uuid: actionId })
      .catch((e: any) => {
        console.error(e);
        throw NotFoundException('action');
      });
    if (action.linkedToId) {
      linkedTo = await this.myActionRepository
        .findOneByOrFail({ uuid: action.linkedToId })
        .catch((e: any) => {
          console.error(e);
          throw NotFoundException('action');
        });
    }
    if (action.linkedFromId) {
      linkedFrom = await this.myActionRepository
        .findOneByOrFail({ uuid: action.linkedFromId })
        .catch((e: any) => {
          console.error(e);
          throw NotFoundException('action');
        });
    }
    if (linkedFrom) {
      if (linkedTo) {
        linkedFrom.linkedToId = linkedTo.uuid;
      } else {
        linkedFrom.linkedToId = null;
      }
      await this.myActionRepository.save(linkedFrom);
    }
    if (linkedTo) {
      if (linkedFrom) {
        linkedTo.linkedFromId = linkedFrom.uuid;
      } else {
        linkedTo.linkedToId = null;
      }
      await this.myActionRepository.save(linkedTo);
    }
    return await this.myActionRepository.delete({ uuid: actionId });
  }
}
