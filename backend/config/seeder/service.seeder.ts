import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceList, ServiceType } from '../../src/service/entity/service.entity';

@Injectable()
export class ServiceSeederService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async seed() {
    const services = [
      {
        name: ServiceList.DEEZER,
        description: 'Deezer service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DISCORD,
        description: 'Discord service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DROPBOX,
        description: 'Dropbox service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GITHUB,
        description: 'GitHub service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE,
        description: 'Google service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.MIRO,
        description: 'Miro service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.NOTION,
        description: 'Notion service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.SPOTIFY,
        description: 'Spotify service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TWITCH,
        description: 'Twitch service description',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TYPEFORM,
        description: 'Typeform service description',
        type: ServiceType.EXTERNAL,
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
