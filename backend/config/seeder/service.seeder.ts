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
        color: '#F3F3F3',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DISCORD,
        description: 'Discord service description',
        color: '#5765F2',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DROPBOX,
        description: 'Dropbox service description',
        color: '#0179DB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GITHUB,
        description: 'GitHub service description',
        color: '#F7FAFB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE,
        description: 'Google service description',
        color: '#27B346',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.MIRO,
        description: 'Miro service description',
        color: '#FFD12A',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.NOTION,
        description: 'Notion service description',
        color: '#F7FAFB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.SPOTIFY,
        description: 'Spotify service description',
        color: '#1ECD5C',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TWITCH,
        description: 'Twitch service description',
        color: '#8A44F3',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TYPEFORM,
        description: 'Typeform service description',
        color: '#F7FAFB',
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
