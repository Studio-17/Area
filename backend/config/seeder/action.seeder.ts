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
        uuid: '7d21181c-98e2-452b-b9db-b022a0d00d9f',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github User Repository',
        description:
          'This action allow you to catch events when a new repository is created by the connected user.',
        link: 'github/check-user-repository/',
      },
      {
        uuid: '0e423200-9d5a-4f7c-8949-3d9bbad368df',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Pull Request',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a new pull request is opened on a repository.',
        link: 'github/check-pull-request/',
      },
      {
        uuid: '485c1317-ec8a-48b6-ab84-fd5f69ba41bd',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Issue',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a new issue is posted on a repository.',
        link: 'github/check-issue/',
      },
      {
        uuid: 'e52c87ae-ad10-4040-ae66-75df2d9ccb71',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github User Issue',
        description: 'This action allow you to catch events when a new issue is assigned to you.',
        link: 'github/check-user-issue/',
      },
      {
        uuid: '5e5db1e5-14b6-4abd-babd-3d50f5619dbe',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Star',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description: 'This action allow you to catch events when a new repository is starred.',
        link: 'github/check-star/',
      },
      {
        uuid: '93cc220c-dae7-4b05-9b8b-31daabb45ca6',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Star Github repository',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description: 'This action allow you to star a Github repository.',
        link: 'github/star-repository/',
      },
      {
        uuid: '04ec2e87-6cf5-4891-b5f4-d9d57c68b7bd',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Unstar Github repository',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description: 'This action allow you to star a Github repository.',
        link: 'github/unstar-repository/',
      },
      {
        uuid: '0b11633b-a373-434d-9886-b2bd89129dc1',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github User Star',
        description:
          'This action allow you to catch events when the connected user stars a repository.',
        link: 'github/check-user-star/',
      },
      {
        uuid: 'f8a89517-8539-4024-bf60-8f29f28001ce',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Review Comment',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a repository get a new review comment.',
        link: 'github/check-review-comment/',
      },
      {
        uuid: '3c3b5e09-2c45-415e-86cd-e1850689127b',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Contributor',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a repository get a new contributor.',
        link: 'github/check-contributor/',
      },
      {
        uuid: 'ee2242c8-2cf2-4a99-bbba-963ba9aadfcc',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Team',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description: 'This action allow you to catch events when a repository get a new team.',
        link: 'github/check-team/',
      },
      {
        uuid: '5d1e8fb8-4913-483b-880e-3819888daced',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Invitation',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a repository get a new invitation.',
        link: 'github/check-invitation/',
      },
      {
        uuid: '096d779f-9b28-4e30-b065-669284749b79',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Milestone',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description: 'This action allow you to catch events when a repository get a new milestone.',
        link: 'github/check-milestone/',
      },
      {
        uuid: 'd1c52fb8-f2a7-4e0a-b705-3412ae5d37a6',
        service: ServiceList.GITHUB,
        type: ActionType.ACTION,
        name: 'Check Github Fork',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
        ],
        description:
          'This action allow you to catch events when a new fork is detected on a repository.',
        link: 'github/check-fork/',
      },
      {
        uuid: 'd7e3bd41-2dd2-4aec-ad77-5579eb42fcbd',
        service: ServiceList.GITHUB,
        type: ActionType.REACTION,
        name: 'Fork Github Repository',
        params: [
          { name: 'owner', type: 'string', description: 'Name of the owner.' },
          { name: 'repo', type: 'string', description: 'Name of the repository.' },
          { name: 'name', type: 'string', description: 'New name of the forked repository.' },
          {
            name: 'default_branch_only',
            type: 'boolean',
            description: 'Clone only default branch (boolean).',
          },
        ],
        description: 'This action allow you to fork an existing repository.',
        link: 'github/fork-repository/',
      },
      // ----- GOOGLE TEMPLATES -----
      {
        uuid: '6503b807-eec8-4d26-817e-45cbe3881ef3',
        service: ServiceList.GOOGLE,
        type: ActionType.ACTION,
        name: 'Check Google Mail',
        description: 'This action allow you to catch events when you receive a new mail.',
        link: 'google/check-mail/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfb7ebc',
        service: ServiceList.GOOGLE,
        type: ActionType.REACTION,
        name: 'Create file on Google Drive',
        params: [
          {
            name: 'filename',
            type: 'string',
            description: 'Name of the file you want to create on Drive.',
          },
        ],
        description: 'This reaction allow you to create a file on Google Drive.',
        link: 'google/publish-doc/',
      },
      // ----- MIRO TEMPLATES -----
      // ----- NOTION TEMPLATES -----
      // ----- SPOTIFY TEMPLATES -----
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfb7e2c',
        service: ServiceList.SPOTIFY,
        type: ActionType.ACTION,
        name: 'A new track is playing',
        description: 'This action check the current playing track on Spotify.',
        link: 'spotify/get-current-playing-track/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfb2e2c',
        service: ServiceList.SPOTIFY,
        type: ActionType.ACTION,
        name: 'The top artist has changed',
        description: 'This action check the current top artist on Spotify.',
        link: 'spotify/get-top-artists',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfa7e2c',
        service: ServiceList.SPOTIFY,
        type: ActionType.ACTION,
        name: 'The top track has changed',
        description: 'This action check the current top track on Spotify.',
        link: 'spotify/get-top-tracks/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e2c',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Create a playlist',
        params: [
          {
            name: 'name',
            type: 'string',
            description: 'Name of the new playlist to create on Spotify.',
          },
          {
            name: 'public',
            type: 'boolean',
            description: 'Is the playlist is public on Spotify ?',
          },
        ],
        description: 'This reaction add a new playlist on Spotify.',
        link: 'spotify/create-playlist/',
      },
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
