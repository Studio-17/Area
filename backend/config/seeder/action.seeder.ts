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
      {
        uuid: 'd1e1e414-32b5-40fa-852c-60eaacfb7e2c',
        service: ServiceList.DISCORD,
        type: ActionType.ACTION,
        name: 'A new scheduled event has been created',
        params: [{ name: 'server', type: 'string', description: 'Name of the server.' }],
        returnValues: [
          { name: 'eventId', type: 'string', desciption: 'id of the event' },
          { name: 'eventName', type: 'string', desciption: 'name of the event' },
          { name: 'eventDescription', type: 'string', desciption: 'description of the event' },
          { name: 'startTime', type: 'string', desciption: 'scheculed start time of the event' },
          { name: 'serverId', type: 'string', desciption: 'server id of the event' },
          { name: 'serverName', type: 'string', desciption: 'server name of the event' },
        ],
        description:
          'This action check if a new scheculed event has been created in a Discord server.',
        link: 'discord/get/guild/scheduled-events/',
      },
      {
        uuid: 'df51e414-12b5-40fa-852c-60eaacfb7e2c',
        service: ServiceList.DISCORD,
        type: ActionType.ACTION,
        name: 'A new message has been sent in a channel',
        params: [
          { name: 'server', type: 'string', description: 'Name of the server.' },
          { name: 'channel', type: 'string', description: 'Name of the channel in the server.' },
        ],
        returnValues: [
          { name: 'serverId', type: 'string', description: 'server id' },
          { name: 'serverName', type: 'string', description: 'server name' },
          { name: 'channelId', type: 'string', description: 'channel id' },
          { name: 'channelName', type: 'string', description: 'channel name' },
          { name: 'messageId', type: 'string', description: 'message id' },
          { name: 'messageContent', type: 'string', description: 'message content' },
          { name: 'messageAuthorId', type: 'string', description: 'message author id' },
          { name: 'messageAuthor', type: 'string', description: 'message author username' },
        ],

        description:
          'This action check if a new message has been sent in a channel of a Discord server.',
        link: 'discord/get/guild/channel/new-message/',
      },
      {
        uuid: 'df51e414-19b5-40ea-852c-60eaacfb7e2c',
        service: ServiceList.DISCORD,
        type: ActionType.REACTION,
        name: 'send a message in a channel',
        params: [
          { name: 'server', type: 'string', description: 'Name of the server.' },
          { name: 'channel', type: 'string', description: 'Name of the channel in the server.' },
          { name: 'message', type: 'string', description: 'content of the message.' },
        ],
        description: 'This reaction send a new message in a discord channel as Reaccoon bot.',
        link: 'discord/create/message/',
      },
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
        returnValues: [
          { name: 'mailTitle', type: 'string', description: 'mail title' },
          { name: 'mailContent', type: 'string', description: 'mail content' },
          { name: 'mailId', type: 'string', description: 'mail id' },
        ],
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
        returnValues: [
          { name: 'trackUrl', type: 'string', description: 'Url to access to the track' },
          { name: 'trackName', type: 'string', description: 'name of the track' },
          { name: 'trackId', type: 'string', description: 'id of the track' },
          { name: 'artistName', type: 'string', description: 'artist who sing the track' },
        ],
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
      // ----- DEEZER TEMPLATES -----

      {
        uuid: 'df56e414-32b5-40fa-852c-61e11cfa7a5d',
        service: ServiceList.DEEZER,
        type: ActionType.REACTION,
        name: 'Create playlist',
        params: [
          {
            name: 'playlist',
            type: 'string',
            description: 'name of the playlist you want to create',
          },
        ],
        description: 'This reaction create a playlist on Deezer.',
        link: 'deezer/create-playlist/',
      },

      // ----- TWITCH TEMPLATES -----
      {
        uuid: '65011817-eec8-4d26-817e-45cbe3881ef3',
        service: ServiceList.TWITCH,
        type: ActionType.ACTION,
        name: 'A new channel is followed',
        returnValues: [
          { name: 'broadcasterId', type: 'string', description: 'twitch id of the broadcaster' },
          { name: 'broadcasterName', type: 'string', description: 'name of the broadcaster' },
        ],
        description: 'This action check if a new channel has been followed.',
        link: 'twitch/new-followed-channel/',
      },
      {
        uuid: '65011817-eea2-4d26-817e-45cbe3881ef3',
        service: ServiceList.TWITCH,
        type: ActionType.ACTION,
        name: 'A is unfollowed',
        description: 'This action check if a channel has been unfollowed.',
        link: 'twitch/unfollowed-channel/',
      },
      {
        uuid: '65011817-eea2-a111-817e-45cbe3881ef3',
        service: ServiceList.TWITCH,
        type: ActionType.ACTION,
        name: 'A followed channel is on live',
        params: [
          {
            name: 'channel',
            type: 'string',
            description: 'name of the followed channel you want to listen.',
          },
        ],
        returnValues: [
          { name: 'gameName', type: 'string', description: 'name of the broadcasted game' },
          { name: 'title', type: 'string', description: 'title of the broadcast' },
          { name: 'broadcasterName', type: 'string', description: 'name of the broadcaster' },
          { name: 'viewerCount', type: 'number', description: 'number of viewers' },
          { name: 'startedAt', type: 'string', description: 'date of the start of the broadcast' },
        ],
        description: 'This action check if a specific followed channel is on live.',
        link: 'twitch/channel-on-stream/',
      },
      // ----- TIMER TEMPLATES -----
      {
        uuid: '11111111-eec8-4d26-817e-45cbe3881ef3',
        service: ServiceList.TIMER,
        type: ActionType.ACTION,
        name: 'Timer is finished',
        description:
          'This action is triggered every time. You can manage the timer with the time of the area',
        link: 'timer/timer-done/',
      },
    ];

    for (const action of actions) {
      console.log(`Seeding ${action.link} action of ${action.service} service`);
      const exists = await this.actionRepository.findOneBy({
        uuid: action.uuid,
      });

      if (!exists) {
        console.log('saving');
        await this.actionRepository.save(action);
      }
    }
  }
}
