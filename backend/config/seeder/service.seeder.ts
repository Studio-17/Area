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
        description:
          'Deezer is a French online music streaming service. It allows users to listen to music content from record labels, as well as podcasts on various devices.',
        color: '#F3F3F3',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DISCORD,
        description:
          'Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.',
        color: '#5765F2',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.DROPBOX,
        description:
          'Dropbox lets people bring their documents, photos and videos everywhere and share them easily. Use Applets to sync your Dropbox uploads with other services, quickly add new files, and keep track of all your important photos, documents, and data — automatically.',
        color: '#0179DB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GITHUB,
        description:
          'GitHub is the best place to share code with friends, co-workers, classmates, and complete strangers. Turn on Applets to automatically track issues, pull requests, repositories, and to quickly create issues.',
        color: '#F7FAFB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE,
        description:
          "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking.",
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE_EVENT,
        description: 'Google Event',
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE_KEEP,
        description: 'Google Keep',
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE_FORMS,
        description: 'Google Forms',
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE_MAIL,
        description: 'Google Mail',
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.GOOGLE_SUITE,
        description: 'Google Suite',
        color: '#F6450D',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.MIRO,
        description:
          'Miro is an online collaborative whiteboard solution that allows you to share ideas between employees.',
        color: '#FFD12A',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.NOTION,
        description:
          "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
        color: '#F7FAFB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.SPOTIFY,
        description:
          'Spotify is a digital music service that gives you access to millions of songs. Applets can help you save your Discover Weekly and Release Radar playlists, share your favorite tunes, and much more.',
        color: '#1ECD5C',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TWITCH,
        description:
          "Twitch is the world’s leading social video platform and community for gamers, video game culture, and the creative arts. Turn on Applets to grow your Twitch audience, and keep up with your favorite broadcasters' videos and livestreams.",
        color: '#8A44F3',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TYPEFORM,
        description:
          'Create meaningful connections with people-friendly forms and surveys. Typeform Applets help you launch, track, and organize your forms.',
        color: '#F7FAFB',
        type: ServiceType.EXTERNAL,
      },
      {
        name: ServiceList.TIMER,
        description: 'Timer.',
        color: '#F7FAFB',
        type: ServiceType.INTERNAL,
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
