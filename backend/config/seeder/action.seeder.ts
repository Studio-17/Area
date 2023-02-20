import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity, ActionType } from '../../src/action/entity/action.entity';
import { ServiceList } from '../../src/service/entity/service.entity';

@Injectable()
export class ActionSeederService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async seed() {
    // There are static UUIDs to avoid to seeders several times the same action
    const actions = [
      // ----- DISCORD TEMPLATES -----
      // ----- GITHUB TEMPLATES -----
      {
        uuid: '0e423200-9d5a-4f7c-8949-3d9bbad368df',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Pull Request',
        description:
          'This action allow you to catch events when a new pull request is opened on a repository.',
        link: 'github/check-pull-request/',
      },
      {
        uuid: '485c1317-ec8a-48b6-ab84-fd5f69ba41bd',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Issue',
        description:
          'This action allow you to catch events when a new issue is posted on a repository.',
        link: 'github/check-issue/',
      },
      // ----- GOOGLE TEMPLATES -----
      {
        uuid: '6503b807-eec8-4d26-817e-45cbe3881ef3',
        service: ServiceList.GOOGLE,
        type: ActionType.ACTION,
        name: 'Check Google Mail',
        description: 'This action allow you to catch events when you receive a new mail.',
        link: 'github/check-mail/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfb7ebc',
        service: ServiceList.GOOGLE,
        type: ActionType.REACTION,
        name: 'Create file on Google Drive',
        description: 'This reaction allow you to create a file on Google Drive.',
        link: 'google/publish-doc/',
      },
      // ----- MIRO TEMPLATES -----
      // ----- NOTION TEMPLATES -----
      // ----- SPOTIFY TEMPLATES -----
      // ----- TWITCH TEMPLATES -----
    ];

    for (const action of actions) {
      console.log(`Seeding ${action.link} action of ${action.service} service`);
      const exists = await this.actionRepository.findOneBy({
        uuid: action.uuid,
      });

      if (!exists) {
        await this.actionRepository.save(action);
      }
    }
  }
}
