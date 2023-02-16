import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity, ActionType } from './entity/action.entity';
import { CreateActionDto } from './dto/create-action-dto';
import { UpdateActionDto } from './dto/update-action-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { ServiceService } from 'src/service/service.service';
import {ServiceList} from "../service/entity/service.entity";

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private actionRepository: Repository<ActionEntity>,
    private readonly serviceService: ServiceService,
  ) {}

  async create(serviceName: ServiceList, createActionDto: CreateActionDto) {
    const service: boolean = await this.serviceService.exist(serviceName);
    if (!service) {
      throw NotFoundException('service');
    }



    const action = await this.actionRepository.create({
      ...createActionDto,
      service: serviceName,
    });
    return await this.actionRepository.save(action);
  }

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

  async update(actionId: string, updateActionDto: UpdateActionDto): Promise<ActionEntity> {
    await this.actionRepository.update({ uuid: actionId }, updateActionDto).catch((e) => {
      console.error(e);
      throw NotFoundException('action');
    });
    return this.findOne(actionId);
  }

  async remove(actionId: string): Promise<string> {
    const result = await this.actionRepository.delete({ uuid: actionId }).catch((e) => {
      console.error(e);
      throw NotFoundException('action');
    });
    return result.affected + ' action has been successfully deleted';
  }

  async exist(actionId: string): Promise<boolean> {
    return this.actionRepository.exist({ where: { uuid: actionId } });
  }
}
