import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceList, ServiceType } from './entity/service.entity';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { CredentialsService } from 'src/credentials/credentials.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private readonly credentialsService: CredentialsService,
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

    try {
      const credentials = await this.credentialsService.findById(userId, serviceName);
      return {
        ...res,
        isConnected: !!credentials,
      };
    } catch (e) {
      console.log('catch');
      return {
        ...res,
        isConnected: false,
      };
    }
  }

  async exist(serviceName: ServiceList): Promise<boolean> {
    return this.serviceRepository.exist({
      where: { name: serviceName },
    });
  }

  async isType(serviceName: ServiceList, type: ServiceType): Promise<boolean> {
    const service = await this.serviceRepository.findOneByOrFail({
      name: serviceName,
    });
    return service.type === type;
  }
}
