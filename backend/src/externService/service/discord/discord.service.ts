import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { UserObject } from './interface/user.interface';
import { GuildObject, UserGuilds } from './interface/guild.interface';
import { CreateSchedulesEventDto } from './dto/create-schedules-event.dto';
import { ChannelObject, GuildChannels } from './interface/channels.interface';
import { GuildInvites } from './interface/invites.interface';
import { ChannelMessages, MessageObject } from './interface/message.interface';
import {
  GuildScheduledEvents,
  ScheduledEventObject,
  ScheduledEventResponseObject,
} from './interface/scheduled-events.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageCreatedObject } from './interface/message-created.interface';

@Injectable()
export class DiscordService {
  constructor(private readonly httpService: HttpService) {}

  public async getAuthenticatedUserInformation(userId: string, accessToken: string): Promise<any> {
    const repositories = await firstValueFrom(
      this.httpService
        .get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(UserObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return repositories;
  }

  public async getAuthenticatedUserGuilds(userId: string, accessToken: string): Promise<any> {
    const guilds = await firstValueFrom(
      this.httpService
        .get('https://discord.com/api/users/@me/guilds', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(UserGuilds, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return guilds;
  }

  public async authorizeBotForGuild(guildChannelId: string): Promise<string> {
    const botID = process.env.DISCORD_CLIENT_BOT;
    const botPermissions = process.env.DISCORD_CLIENT_BOT_PERMISSIONS;

    return `https://discord.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=${botPermissions}&guild_id=${guildChannelId}`;
  }

  public async getGuildInformation(botToken: string, guildID: string): Promise<any> {
    const guildInformation = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(UserGuilds, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return guildInformation;
  }

  public async getGuildChannels(botToken: string, guildID: string): Promise<any> {
    const guildChannels = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/channels`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(GuildChannels, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return guildChannels;
  }

  public async getGuildInvites(botToken: string, guildID: string): Promise<any> {
    const guildInvites = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/invites`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(GuildInvites, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return guildInvites;
  }

  public async getGuildChannelMessages(botToken: string, guildChannelID: string): Promise<any> {
    const channelMessages = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/messages`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(ChannelMessages, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return channelMessages;
  }

  public async getGuildChannelMessagesById(
    botToken: string,
    guildChannelID: string,
    messageID: string,
  ): Promise<any> {
    const message = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/messages/${messageID}`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(MessageObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return message;
  }

  public async getGuildScheduledEvents(botToken: string, guildChannelID: string): Promise<any> {
    const message = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/scheduled-events`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(GuildScheduledEvents, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return message;
  }

  public async createGuildScheduledEvents(
    botToken: string,
    guildChannelID: string,
    scheduledEvent: CreateSchedulesEventDto,
  ): Promise<any> {
    const message = await firstValueFrom(
      this.httpService
        .post(`https://discord.com/api/guilds/${guildChannelID}/scheduled-events`, {
          data: scheduledEvent,
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(ScheduledEventResponseObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return message;
  }

  public async getGuildScheduledEventsById(
    botToken: string,
    guildID: string,
    scheduledEventId: string,
  ): Promise<any> {
    const message = await firstValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/scheduled-events/${scheduledEventId}`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(ScheduledEventObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return message;
  }

  public async postGuildChannelMessage(
    botToken: string,
    guildChannelID: string,
    createMessage: CreateMessageDto,
  ): Promise<any> {
    const message = await firstValueFrom(
      this.httpService
        .post(`https://discord.com/api/channels/${guildChannelID}/message`, {
          data: createMessage,
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(MessageCreatedObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return message;
  }
}
