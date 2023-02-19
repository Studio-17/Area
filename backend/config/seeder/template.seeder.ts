import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../../src/action/entity/template.entity';
import { ActionType } from '../../src/action/entity/action.entity';
import { ServiceList } from '../../src/service/entity/service.entity';

@Injectable()
export class TemplateSeederService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async seed() {
    const templates = [
      // ----- DISCORD TEMPLATES -----
      // ----- GITHUB TEMPLATES -----
      {
        templateId: 'github-check-pull-request',
        type: ActionType.ACTION,
        service: ServiceList.GITHUB,
        name: 'Check Pull Request',
        description:
          'This action allow you to catch events when a new pull request is opened on a repository.',
      },
      {
        templateId: 'github-check-issue',
        type: ActionType.ACTION,
        service: ServiceList.GITHUB,
        name: 'Check Issue',
        description:
          'This action allow you to catch events when a new issue is posted on a repository.',
      },
      // ----- GOOGLE TEMPLATES -----
      {
        templateId: 'google-check-mail',
        type: ActionType.ACTION,
        service: ServiceList.GOOGLE,
        name: 'Check Mail',
        description: 'This action allow you to catch events when you receive a new mail.',
      },
      // ----- MIRO TEMPLATES -----
      // ----- NOTION TEMPLATES -----
      // ----- SPOTIFY TEMPLATES -----
      // ----- TWITCH TEMPLATES -----
    ];

    for (const template of templates) {
      console.log(`Seeding ${template.name} action of ${template.service} service`);
      const exists = await this.templateRepository.findOneBy({
        templateId: template.templateId,
      });

      if (!exists) {
        await this.templateRepository.save(template);
      }
    }
  }
}
