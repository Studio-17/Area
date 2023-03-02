import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordRecord } from './entity/discordRecord.entity';
import { DiscordService } from './discord.service';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';

@Injectable()
export class DiscordCronService {
  constructor(
    private readonly discordService: DiscordService,
    @InjectRepository(DiscordRecord)
    private readonly discordRecordRepository: Repository<DiscordRecord>,
  ) {}

  public async findByUserId(userId: string, category: string): Promise<DiscordRecord> {
    try {
      return await this.discordRecordRepository.findOneBy({
        userId: userId,
        category: category,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastRecord(twitchRecord: DiscordRecord) {
    const record = await this.findByUserId(twitchRecord.userId, twitchRecord.category);
    if (!record) {
      try {
        return { new: false, mail: await this.discordRecordRepository.save(twitchRecord) };
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    if (record.content != twitchRecord.content) {
      try {
        const newRecord = await this.discordRecordRepository.update(
          {
            userId: record.userId,
            category: record.category,
            content: record.content,
          },
          { ...twitchRecord },
        );

        if (!newRecord) {
          throw NotFoundException(`Record does not exist`);
        }
        return {
          new: true,
          mail: await this.findByUserId(twitchRecord.userId, twitchRecord.category),
        };
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    return { new: false, mail: record };
  }

  private async checkNewScheduledEvents(actionParam: ActionParam): Promise<ActionResult> {
    const userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
    const server = getElemContentInParams(actionParam.params, 'server', 'undefined');
    try {
      const guild = await this.discordService
        .getAuthenticatedUserGuilds(actionParam.accessToken)
        .then((guilds) => guilds.find((guild: any) => guild.name === server));
      const events = await this.discordService.getGuildScheduledEvents(guild.id);
      if (!events.length) {
        return { isTriggered: false };
      }
      const record = new DiscordRecord();
      record.userId = userId;
      record.category = 'lastScheduledEvents';
      record.content = events.at(-1).id.toString();
      return {
        isTriggered: (await this.findOrUpdateLastRecord(record)).new,
        returnValues: [
          { name: 'eventId', content: events[0].id },
          { name: 'eventName', content: events[0].name },
          { name: 'eventDescription', content: events[0].description },
          { name: 'startTime', content: events[0].scheculed_start_time },
          { name: 'serverId', content: events[0].guild_id },
          { name: 'serverName', content: guild.name },
        ],
      };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  private async checkNewMessageinChannel(actionParam: ActionParam): Promise<ActionResult> {
    const userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
    const server = getElemContentInParams(actionParam.params, 'server', 'undefined');
    const channelName = getElemContentInParams(actionParam.params, 'channel', 'général');

    try {
      const guild = await this.discordService
        .getAuthenticatedUserGuilds(actionParam.accessToken)
        .then((guilds) => guilds.find((guild: any) => guild.name === server));
      const channel = await this.discordService
        .getGuildChannels(guild.id)
        .then((channels) =>
          channels.find(
            (channel: any) =>
              channel.name.toLowerCase() === channelName.toLowerCase() && channel.last_message_id,
          ),
        );
      const message = await this.discordService.getGuildChannelMessagesById(
        channel.id,
        channel.last_message_id,
      );
      const record = new DiscordRecord();
      record.userId = userId;
      record.category = 'lastMessage';
      record.content = channel.last_message_id;
      return {
        isTriggered: (await this.findOrUpdateLastRecord(record)).new,
        returnValues: [
          { name: 'serverId', content: guild.id },
          { name: 'serverName', content: guild.name },
          { name: 'channelId', content: channel.id },
          { name: 'channelName', content: channel.name },
          { name: 'messageId', content: channel.last_message_id },
          { name: 'messageContent', content: message.content },
          { name: 'messageAuthorId', content: message.author.id },
          { name: 'messageAuthor', content: message.author.username },
        ],
      };
    } catch (error) {
      console.log('error');
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  availableActions = new Map<string, ActionFunction>([
    ['discord/get/guild/scheduled-events/', this.checkNewScheduledEvents.bind(this)],
    ['discord/get/guild/channel/new-message/', this.checkNewMessageinChannel.bind(this)],
  ]);
}
