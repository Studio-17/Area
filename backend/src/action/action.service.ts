import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity, ActionType } from './entity/action.entity';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { ServiceList } from '../service/entity/service.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private actionRepository: Repository<ActionEntity>,
  ) {}

  async findAll(): Promise<ActionEntity[]> {
    return this.actionRepository.find();
  }

  async findByType(type: ActionType): Promise<ActionEntity[]> {
    return this.actionRepository.findBy({ type: type });
  }

  async findOne(actionId: string): Promise<ActionEntity> {
    const res: ActionEntity = await this.actionRepository
      .findOneByOrFail({ uuid: actionId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('action');
      });
    if (!res) {
      throw NotFoundException('action');
    }
    return res;
  }

  async findByService(serviceName: ServiceList): Promise<ActionEntity[]> {
    return this.actionRepository.findBy({ service: serviceName }).catch((e) => {
      console.error(e);
      throw NotFoundException('service');
    });
  }

  async findByLink(link: string): Promise<ActionEntity> {
    return this.actionRepository.findOneBy({ link: link }).catch((e) => {
      console.error(e);
      throw NotFoundException('action');
    });
  }

  async exist(actionId: string): Promise<boolean> {
    return this.actionRepository.exist({ where: { uuid: actionId } });
  }
}
