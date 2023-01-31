import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action } from './action.entity';
import { CreateActionDto } from './dto/create-action-dto';
import { UpdateActionDto } from './dto/update-action-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
    private readonly serviceService: ServiceService,
  ) {}

  async create(serviceId: string, createActionDto: CreateActionDto) {
    const service: boolean = await this.serviceService.exist(serviceId);
    if (!service) {
      throw NotFoundException('service');
    }

    const action: Action = this.actionRepository.create({
      ...createActionDto,
      serviceId: serviceId,
    });
    return await this.actionRepository.save(action);
  }

  async findAll() {
    return this.actionRepository.find();
  }

  async findOne(actionId: string) {
    const res = this.actionRepository.findOneByOrFail({ uuid: actionId }).catch((e) => {
      console.error(e);
      throw NotFoundException('action');
    });
    if (!res) {
      throw NotFoundException('action');
    }
    return res;
  }

  async findByService(serviceId: string) {
    return this.actionRepository.findBy({ serviceId: serviceId }).catch((e) => {
      console.error(e);
      throw NotFoundException('service');
    });
  }

  async update(actionId: string, updateActionDto: UpdateActionDto) {
    await this.actionRepository.update({ uuid: actionId }, updateActionDto).catch((e) => {
      console.error(e);
      throw NotFoundException('action');
    });
    return this.findOne(actionId);
  }

  async remove(actionId: string) {
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
