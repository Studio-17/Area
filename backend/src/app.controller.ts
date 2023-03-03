import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
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
                name: undefined,
                description: undefined,
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
            name: 'dropbox',
            actions: [
              {
                name: undefined,
                description: undefined,
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
            name: 'github',
            actions: [
              {
                name: undefined,
                description: undefined,
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
            name: 'google',
            actions: [
              {
                name: 'new_email_received',
                description: 'The user received a new mail in its google mail mailbox',
              },
            ],
            reactions: [
              {
                name: 'create_google_doc',
                description: 'It creates a google doc on the user`s google drive',
              },
            ],
          },
          {
            name: 'miro',
            actions: [
              {
                name: undefined,
                description: undefined,
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
            name: 'notion',
            actions: [
              {
                name: undefined,
                description: undefined,
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
            name: 'typeform',
            actions: [
              {
                name: undefined,
                description: undefined,
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
        ],
      },
    });
  }
}
