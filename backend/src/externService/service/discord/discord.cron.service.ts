import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordRecord } from './entity/discordRecord.entity';
import { DiscordService } from './discord.service';
import { Params } from 'src/cron/cron.type';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { TwitchRecord } from '../twitch/entity/twitchRecord.entity';

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

  private async checkNewScheduledEvents(accessToken: string, params: Params): Promise<boolean> {
    const userId = getElemContentInParams(params, 'userId', 'undefined');
    const server = getElemContentInParams(params, 'server', 'undefined');
    try {
      const guilds = await this.discordService.getAuthenticatedUserGuilds(accessToken);
      const guild = guilds.find((guild: any) => guild.name === server);
      const events = await this.discordService.getGuildScheduledEvents(guild.id);
      if (!events.length) {
        return false;
      }
      const record = new TwitchRecord();
      record.userId = userId;
      record.category = 'lastScheduledEvents';
      record.content = events.at(-1).id.toString();
      const lastChanged = (await this.findOrUpdateLastRecord(record)).new;
      if (lastChanged) {
        return true;
      }
    } catch (error) {
      console.log('error');
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
    return false;
  }

  availableActions = new Map([
    ['discord/get/guild/scheduled-events/', this.checkNewScheduledEvents.bind(this)],
  ]);
}
