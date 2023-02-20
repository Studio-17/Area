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
    const actions = [
      // ----- DISCORD TEMPLATES -----
      // ----- GITHUB TEMPLATES -----
      {
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Pull Request',
        description:
          'This action allow you to catch events when a new pull request is opened on a repository.',
        link: '/github/check-pull-request',
      },
      {
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Issue',
        description:
          'This action allow you to catch events when a new issue is posted on a repository.',
        link: '/github/check-issue',
      },
      // ----- GOOGLE TEMPLATES -----
      {
        service: ServiceList.GOOGLE,
        type: ActionType.ACTION,
        name: 'Check Google Mail',
        description: 'This action allow you to catch events when you receive a new mail.',
        link: '/github/check-mail',
      },
      {
        service: ServiceList.GOOGLE,
        type: ActionType.REACTION,
        name: 'Create file on Google Drive',
        description: 'This reaction allow you to create a file on Google Drive.',
        link: '/github/publish-doc',
      },
      // ----- MIRO TEMPLATES -----
      // ----- NOTION TEMPLATES -----
      // ----- SPOTIFY TEMPLATES -----
      // ----- TWITCH TEMPLATES -----
    ];

    for (const action of actions) {
      console.log(`Seeding ${action.name} action of ${action.service} service`);
      await this.actionRepository.save(action);
    }
  }
}
