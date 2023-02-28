import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DiscordOAuth2Service {
  constructor(private readonly httpService: HttpService) {}

  public async authorizeBotForGuild(): Promise<string> {
    const botID = process.env.DISCORD_CLIENT_ID;
    const botPermissions = process.env.DISCORD_CLIENT_BOT_PERMISSIONS;

    return `https://discord.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=${botPermissions}`;
  }
}
