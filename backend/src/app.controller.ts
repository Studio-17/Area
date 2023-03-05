import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('date')
  date() {
    return Date.now();
  }

  @Post('ping')
  ping(@Body() body: string): void {
    console.log('ping', body);
  }

  @Get('about.json')
  aboutjson(@Req() request, @Res() response): any {
    return response.status(HttpStatus.OK).json({
      client: {
        host: request.ip,
      },
      server: {
        current_time: Date.now(),
        services: [
          {
            name: 'deezer',
            actions: [
              {
                name: 'A new playlist is created',
                description: 'This action check if a new playlist has been created',
              },
              {
                name: 'A playlist is deleted',
                description: 'This action check if a playlist has been deleted',
              },
            ],
            reactions: [
              {
                name: 'Create playlist',
                description: 'This reaction create a playlist on Deezer.',
              },
            ],
          },
          {
            name: 'discord',
            actions: [
              {
                name: 'A new event is scheduled in a Server',
                description:
                  'This action check if a new scheduled event is created in a Discord Server.',
              },
              {
                name: 'A new message in a channel',
                description:
                  'This action check if a new message has been sent in a Discord Server channel.',
              },
            ],
            reactions: [
              {
                name: 'Send a message in a channel',
                description: 'This reaction send a message in a Discord Server channel.',
              },
            ],
          },
          {
            name: 'github',
            actions: [
              {
                name: 'Check user repository',
                description: 'This action checks if the connected user has a new repository.',
              },
              {
                name: 'Check pull request',
                description: 'This action checks if a new pull request is created on a repository.',
              },
              {
                name: 'Check issue',
                description: 'This action checks if a new issue is created on a repository.',
              },
              {
                name: 'Check user issue',
                description: 'This action checks if a new issue is assigned to the connected user.',
              },
              {
                name: 'Check team',
                description: 'This action checks if a new team is created on a repository.',
              },
              {
                name: 'Check contributor',
                description: 'This action checks if a new contributor is detected on a repository.',
              },
              {
                name: 'Check fork',
                description: 'This action checks if a repository has a new fork.',
              },
              {
                name: 'Check star',
                description: 'This action checks if a repository has a new star.',
              },
              {
                name: 'Check user star',
                description: 'This action checks if the connected user has starred a new repository.',
              },
              {
                name: 'Check invitation',
                description: 'This action checks if a new invitation is created on a repository.',
              },
              {
                name: 'Check milestone',
                description: 'This action checks if a new milestone is created on a repository.',
              },
              {
                name: 'Check review comment',
                description: 'This action checks if a new comment is posted on a review.',
              },
            ],
            reactions: [
              {
                name: 'Fork repository',
                description: 'This reaction fork a repository.',
              },
              {
                name: 'Star repository',
                description: 'This reaction star a repository.',
              },
              {
                name: 'Unstar repository',
                description: 'This reaction unstar a repository.',
              },
            ],
          },
          {
            name: 'google-mail',
            actions: [
              {
                name: 'new_email_received',
                description: 'The user received a new mail in its google mail mailbox',
              },
            ],
            reactions: [
              {
                name: 'Send mail',
                description: 'This reaction send a mail with Gmail.',
              },
            ],
          },
          {
            name: 'google-suite',
            actions: [
              {
                name: 'Check doc created on google drive',
                description:
                  'This action allow you to catch events when a new doc is created on your drive.',
              },
            ],
            reactions: [
              {
                name: 'Empty the trash of your google drive',
                description: 'This action allow you to trash your google drive trash',
              },
              {
                name: 'Create file on Google Drive',
                description: 'This reaction allow you to create a file on Google Drive.',
              },
            ],
          },
          {
            name: 'google-event',
            actions: [
              {
                name: 'A new calendar is created or added',
                description: 'A new calendar is created or added in the user`s google account',
              },
              {
                name: 'A new event is created',
                description: 'A new event is created in a specific user`s calendar',
              },
            ],
            reactions: [
              {
                name: 'Create a new event',
                description: 'It create a new event in a specific calendar.',
              },
            ],
          },
          {
            name: 'miro',
            actions: [
              {
                name: 'member joined a board',
                description: 'It check if a member joined a board on Miro.',
              },
            ],
            reactions: [
              {
                name: 'create a board',
                description: 'It create a new board on Miro.',
              },
              {
                name: 'share a board',
                description: 'It share a board on Miro.',
              },
            ],
          },
          {
            name: 'spotify',
            actions: [
              {
                name: 'A new track is playing',
                description: 'It check the current playing track on Spotify.',
              },
              {
                name: 'The top artist has changed',
                description: 'It check the current top artist on Spotify.',
              },
              {
                name: 'The top track has changed',
                description: 'It check the current top track on Spotify.',
              },
            ],
            reactions: [
              {
                name: 'Create a playlist',
                description: 'It create a new playlist on Spotify.',
              },
              {
                name: 'Pause the playing track',
                description: 'It pause the playing track on Spotify.',
              },
              {
                name: 'Resume the playing track',
                description: 'It resume the playing track on Spotify.',
              },
              {
                name: 'Play next track',
                description: 'It plays the next track on Spotify.',
              },
              {
                name: 'Play previous track',
                description: 'It plays the previous track on Spotify.',
              },
              {
                name: 'Add track to queue',
                description: 'It add track in queue on Spotify.',
              },
              {
                name: 'Add track to playlist',
                description: 'It add track in a playlist Spotify.',
              },
              {
                name: 'Unfollow or delete a playlist',
                description: 'It unfollow or delete a playlist Spotify.',
              },
              {
                name: 'Follow a playlist',
                description: 'It follow a playlist Spotify.',
              },
            ],
          },
          {
            name: 'twitch',
            actions: [
              {
                name: 'A new channel is followed',
                description: 'It check if a new channel is followed.',
              },
              {
                name: 'A channel is unfollowed',
                description: 'It check if a channel is unfollowed.',
              },
              {
                name: 'A followed channel is on live',
                description: 'It check if a specific followed channel is on live.',
              },
            ],
            reactions: [
              {
                name: undefined,
                description: undefined,
              },
            ],
          },
          {
            name: 'timer',
            actions: [
              {
                name: 'Timer is done',
                description: 'The reactions are executed when the timer is done.',
              },
            ],
            reactions: [
              {
                name: undefined,
                description: undefined,
              },
            ],
          },
          {
            name: 'webhook',
            actions: [
              {
                name: 'get response webhook changed',
                description: 'The action check if the response of the get url call changed.',
              },
            ],
            reactions: [
              {
                name: 'Post webhook call',
                description: 'The reaction call the post url.',
              },
            ],
          },
        ],
      },
    });
  }
}
