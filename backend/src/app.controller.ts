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
