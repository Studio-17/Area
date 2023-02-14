import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service: Service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAll() {
    return this.serviceRepository.find();
  }

  async findOne(serviceId: string) {
    const res = this.serviceRepository.findOneByOrFail({ uuid: serviceId }).catch((e) => {
      console.error(e);
      throw NotFoundException('service');
    });
    if (!res) {
      throw NotFoundException('service');
    }
    return res;
  }

  async update(serviceId: string, updateServiceDto: UpdateServiceDto) {
    await this.serviceRepository.update({ uuid: serviceId }, updateServiceDto).catch((e) => {
      console.error(e);
      throw NotFoundException('service');
    });
    return this.findOne(serviceId);
  }

  async remove(serviceId: string) {
    const result = await this.serviceRepository.delete({ uuid: serviceId }).catch((e) => {
      console.error(e);
      throw NotFoundException('service');
    });
    return result.affected + ' service has been successfully deleted';
  }

  async exist(serviceId: string): Promise<boolean> {
    return this.serviceRepository.exist({ where: { uuid: serviceId } });
  }
}
