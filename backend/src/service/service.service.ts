import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceList, ServiceType } from './entity/service.entity';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { CredentialsEntity } from '../credentials/entity/credentials.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(CredentialsEntity)
    private credentialsRepository: Repository<CredentialsEntity>,
  ) {}

  async findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  async findOne(
    serviceName: ServiceList,
    userId: string,
  ): Promise<{
    createdAt: Date;
    name: ServiceList;
    isConnected: boolean;
    description: string;
    type: ServiceType;
    updatedAt: Date;
  }> {
    const res: ServiceEntity = await this.serviceRepository
      .findOneByOrFail({ name: serviceName })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('service');
      });

    const credentials = await this.credentialsRepository.findOneBy({
      userId: userId,
      service: serviceName,
    });

    return {
      ...res,
      isConnected: !!credentials,
    };
  }

  async exist(serviceName: ServiceList): Promise<boolean> {
    return this.serviceRepository.exist({
      where: { name: serviceName },
    });
  }
}
