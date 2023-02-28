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
        link: 'spotify/get-top-artists/',
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
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e3c',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Resume the current playing track',
        description: 'This reaction resume the current playing track running on Spotify.',
        link: 'spotify/play-resume-current-track/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e3d',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Pause the current playing track',
        description: 'This reaction pause the current playing track running on Spotify.',
        link: 'spotify/pause-current-track/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e4c',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Play the next track',
        description: 'This reaction play the next track on Spotify.',
        link: 'spotify/play-next-track/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e4d',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Play the previous track',
        description: 'This reaction play the previous on Spotify.',
        link: 'spotify/play-previous-track/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7e5c',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Add a track to the queue',
        params: [
          {
            name: 'track',
            type: 'string',
            description: 'name of the track to add on queue.',
          },
          {
            name: 'artist',
            type: 'string',
            description: 'name of the artist of the track to add on queue (optional).',
          },
        ],
        description: 'This reaction add a track to the playing queue on Spotify.',
        link: 'spotify/add-track-to-queue/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61eaacfa7a4d',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Add a track to a playlist',
        params: [
          {
            name: 'playlist',
            type: 'string',
            description: 'name of the playlist where you want to add the track.',
          },
          {
            name: 'track',
            type: 'string',
            description: 'name of the track to add on the playlist.',
          },
          {
            name: 'artist',
            type: 'string',
            description: 'name of the artist of the track to add on the playlist (optional).',
          },
        ],
        description: 'This reaction add a track in a playlist on Spotify.',
        link: 'spotify/add-track-to-playlist/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61e1acfa7a4d',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Unfollow or Delete a playlist',
        params: [
          {
            name: 'playlist',
            type: 'string',
            description:
              'name of the playlist you want to unfollow (that you already following of course).',
          },
        ],
        description: 'This reaction unfollow or delete a playlist on Spotify.',
        link: 'spotify/unfollow-playlist/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-61e11cfa7a4d',
        service: ServiceList.SPOTIFY,
        type: ActionType.REACTION,
        name: 'Follow playlist',
        params: [
          {
            name: 'playlist',
            type: 'string',
            description: 'name of the playlist you want to follow.',
          },
        ],
        description: 'This reaction follow a playlist on Spotify.',
        link: 'spotify/follow-playlist/',
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
