import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceList } from './entity/service.entity';
import { NotFoundException } from '../utils/exceptions/not-found.exception';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
  ) {}

  // async create(createServiceDto: CreateServiceDto) {
  //   const service: ServiceEntity = this.serviceRepository.create(createServiceDto);
  //   return await this.serviceRepository.save(service);
  // }

  async findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  async findOne(serviceName: ServiceList): Promise<ServiceEntity> {
    const res: ServiceEntity = await this.serviceRepository
      .findOneByOrFail({ name: serviceName })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('service');
      });
    // const user: UserEntity
    return res;
  }

  // async update(serviceName: ServiceList, updateServiceDto: UpdateServiceDto): Promise<ServiceEntity> {
  //   await this.serviceRepository
  //     .update({ name: serviceName }, updateServiceDto)
  //     .catch((e) => {
  //       console.error(e);
  //       throw NotFoundException('service');
  //     });
  //   return this.findOne(serviceName);
  // }

  // async remove(serviceName: ServiceList): Promise<string> {
  //   const result = await this.serviceRepository
  //     .delete({ name: serviceName })
  //     .catch((e) => {
  //       console.error(e);
  //       throw NotFoundException('service');
  //     });
  //   return result.affected + ' service has been successfully deleted';
  // }

  async exist(serviceName: ServiceList): Promise<boolean> {
    return this.serviceRepository.exist({
      where: { name: serviceName },
    });
  }
}
