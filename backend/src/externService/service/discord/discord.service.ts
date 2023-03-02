import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { UserObject } from './interface/user.interface';
import { UserGuilds } from './interface/guild.interface';
import { CreateSchedulesEventDto } from './dto/create-schedules-event.dto';
import { GuildChannels } from './interface/channels.interface';
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

  public async getAuthenticatedUserInformation(accessToken: string): Promise<any> {
    const repositories = await lastValueFrom(
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

  public async getAuthenticatedUserGuilds(accessToken: string): Promise<any> {
    const guilds = await lastValueFrom(
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

  public async getGuildInformation(guildID: string): Promise<any> {
    const guildInformation = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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

  public async getGuildChannels(guildID: string): Promise<any> {
    const guildChannels = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/channels`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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

  public async getGuildInvites(guildID: string): Promise<any> {
    const guildInvites = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/invites`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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

  public async getGuildChannelMessages(guildChannelID: string): Promise<any> {
    const channelMessages = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/messages`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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
    guildChannelID: string,
    messageID: string,
  ): Promise<any> {
    const message = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/messages/${messageID}`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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

  public async getGuildScheduledEvents(guildChannelID: string): Promise<any> {
    const message = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildChannelID}/scheduled-events`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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
    guildChannelID: string,
    scheduledEvent: CreateSchedulesEventDto,
  ): Promise<any> {
    const message = await lastValueFrom(
      this.httpService
        .post(`https://discord.com/api/guilds/${guildChannelID}/scheduled-events`, {
          data: scheduledEvent,
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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
    guildID: string,
    scheduledEventId: string,
  ): Promise<any> {
    const message = await lastValueFrom(
      this.httpService
        .get(`https://discord.com/api/guilds/${guildID}/scheduled-events/${scheduledEventId}`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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
    guildChannelID: string,
    createMessage: CreateMessageDto,
  ): Promise<any> {
    const message = await lastValueFrom(
      this.httpService
        .post(`https://discord.com/api/channels/${guildChannelID}/message`, {
          data: createMessage,
          headers: {
            Authorization: `Bot ${process.env.DISCORD_CLIENT_BOT}`,
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
