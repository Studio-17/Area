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
        service: ServiceList.GOOGLE_MAIL,
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
        uuid: '1503b807-aec8-4a26-817e-49cab38218f3',
        service: ServiceList.GOOGLE_EVENT,
        type: ActionType.ACTION,
        name: 'New Google Calendar',
        returnValues: [
          { name: 'calendarId', type: 'string', description: 'id of the new calendar' },
          { name: 'calendarName', type: 'string', description: 'name of the new calendar' },
        ],
        description: 'This action check if a google calendar has been created.',
        link: 'google-event/new-calendar/',
      },
      {
        uuid: '6503b807-aec8-4d26-817e-49cbe3821ef3',
        service: ServiceList.GOOGLE_EVENT,
        type: ActionType.ACTION,
        name: 'New event on Google Calendar',
        params: [{ name: 'calendarName', type: 'string', description: 'Name of the calendar.' }],
        returnValues: [
          { name: 'calendarId', type: 'string', description: 'id of the calendar' },
          { name: 'eventId', type: 'string', description: 'id of the event' },
          { name: 'eventName', type: 'string', description: 'title of the event' },
          { name: 'eventStart', type: 'string', description: 'start date of the event' },
          { name: 'eventEnd', type: 'string', description: 'end date of the event' },
        ],
        description: 'This action check if a new event has been added on your google calendar.',
        link: 'google-event/new-event/',
      },
      {
        uuid: 'a523b807-fec8-4d26-817e-491be38212f3',
        service: ServiceList.GOOGLE_EVENT,
        type: ActionType.REACTION,
        name: 'Create a new event on Google Calendar',
        params: [
          { name: 'calendarName', type: 'string', description: 'Name of the calendar.' },
          { name: 'eventLocation', type: 'string', description: 'Location of the event.' },
          {
            name: 'eventStartDate',
            type: 'date',
            description: 'Start date of the event in YYY-MM-DD format.',
          },
          {
            name: 'eventContent',
            type: 'string',
            description: 'content of the event.',
          },
        ],
        description: 'This reaction create a new event on google calendar.',
        link: 'google-event/calendars/events/create/',
      },
      {
        uuid: 'df56e414-32b5-40fa-852c-60eaacfb7ebc',
        service: ServiceList.GOOGLE_SUITE,
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
      {
        uuid: '1f5bea14-32b5-40fa-817c-60ea1cfb2a29',
        service: ServiceList.MIRO,
        type: ActionType.ACTION,
        name: 'A user Joined a board',
        params: [{ name: 'boardName', type: 'string', description: 'name of the board.' }],
        returnValues: [
          { name: 'memberName', type: 'string', description: 'name of the joining member' },
          { name: 'memberId', type: 'string', description: 'name of the joining member' },
        ],
        description: 'This action will check if a user joined a board on Miro.',
        link: 'miro/user-join-board/',
      },
      {
        uuid: 'df56ea14-32b5-40fa-852c-60ea3cfb7e2c',
        service: ServiceList.MIRO,
        type: ActionType.REACTION,
        name: 'Create a new board',
        params: [
          { name: 'name', type: 'string', description: 'name of the board.' },
          { name: 'description', type: 'string', description: 'description of the board.' },
        ],
        description: 'This reaction will create a new board in the team on Miro.',
        link: 'miro/create/team/boards/',
      },
      {
        uuid: 'ae56ea14-3295-40fa-852c-6fea3cfb7e2c',
        service: ServiceList.MIRO,
        type: ActionType.REACTION,
        name: 'Share a board',
        params: [
          { name: 'name', type: 'string', description: 'name of the board.' },
          { name: 'email', type: 'string', description: 'email of the new user.' },
          { name: 'role', type: 'string', description: 'Role of the new user.' },
        ],
        description: 'This reaction will share a board with email member on Miro.',
        link: 'miro/board/share',
      },

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
        uuid: '65011817-eec8-4d26-817e-46cbe3181ef3',
        service: ServiceList.DEEZER,
        type: ActionType.ACTION,
        name: 'A new playlist is created',
        returnValues: [
          { name: 'playlistName', type: 'string', description: 'New created playlist name' },
        ],
        description: 'This action check if a new playlist has been created',
        link: 'deezer/new-created-playlist/',
      },
      {
        uuid: '65011817-eec8-4d26-817e-46cbe3181ef3',
        service: ServiceList.DEEZER,
        type: ActionType.ACTION,
        name: 'A playlist is deleted',
        returnValues: [
          { name: 'playlistName', type: 'string', description: 'Deleted playlist name' },
        ],
        description: 'This action check if a playlist has been deleted',
        link: 'deezer/deleted-playlist/',
      },
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
        await this.actionRepository.save(action);
      }
    }
  }
}
