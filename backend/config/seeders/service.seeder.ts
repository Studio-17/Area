import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from '../../src/service/service.entity';

@Injectable()
export class ServiceSeederService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async seed() {
    const services = [
      {
        // uuid: '00000000-0000-0000-0000-000000000000',
        name: 'Google',
        description: 'Google Service description',
      },
      {
        // uuid: '11111111-1111-1111-1111-111111111111',
        name: 'GitHub',
        description: 'GitHub Service description',
      },
      {
        // uuid: '22222222-2222-2222-2222-222222222222',
        name: 'Notion',
        description: 'Notion Service description',
      },
      {
        // uuid: '33333333-3333-3333-3333-333333333333',
        name: 'Spotify',
        description: 'Spotify Service description',
      },
    ];

    for (const service of services) {
      console.log(`Seeding ${service.name} Service`);
      const exists = await this.serviceRepository.findOneBy({
        name: service.name,
      });

      if (!exists) {
        await this.serviceRepository.save(service);
      }
    }
  }
}
