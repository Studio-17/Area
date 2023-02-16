import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceEntity, ServiceType } from '../../src/service/entity/service.entity';

@Injectable()
export class ServiceSeederService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async seed() {
    const services = [
      {
        name: ServiceType.DISCORD,
        description: 'Discord service description',
      },
      {
        name: ServiceType.GITHUB,
        description: 'GitHub service description',
      },
      {
        name: ServiceType.GOOGLE,
        description: 'Google service description',
      },
      {
        name: ServiceType.MIRO,
        description: 'Miro service description',
      },
      {
        name: ServiceType.NOTION,
        description: 'Notion service description',
      },
      {
        name: ServiceType.SPOTIFY,
        description: 'Spotify service description',
      },
      {
        name: ServiceType.TWITCH,
        description: 'Twitch service description',
      },
    ];

    for (const service of services) {
      console.log(`Seeding ${service.name} service`);
      const exists = await this.serviceRepository.findOneBy({
        name: service.name,
      });

      if (!exists) {
        await this.serviceRepository.save(service);
      }
    }
  }
}
