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
                description: 'It add track on queue on Spotify.',
              },
            ],
          },
          {
            name: 'twitch',
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
        ],
      },
    });
  }
}
