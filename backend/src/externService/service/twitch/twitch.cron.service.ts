import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Params } from 'src/cron/cron.type';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';
import { Repository } from 'typeorm';
import { TwitchRecord } from './entity/twitchRecord.entity';
import { TwitchService } from './twitch.service';

@Injectable()
export class TwitchCronService {
  constructor(
    private readonly twitchService: TwitchService,
    @InjectRepository(TwitchRecord)
    private readonly twitchRecordRepository: Repository<TwitchRecord>,
  ) {}

  public async findByUserId(userId: string, category: string): Promise<TwitchRecord> {
    try {
      return await this.twitchRecordRepository.findOneBy({
        userId: userId,
        category: category,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastRecord(twitchRecord: TwitchRecord) {
    const record = await this.findByUserId(twitchRecord.userId, twitchRecord.category);
    if (!record) {
      try {
        return { new: false, mail: await this.twitchRecordRepository.save(twitchRecord) };
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    if (record.content != twitchRecord.content) {
      try {
        const newRecord = await this.twitchRecordRepository.update(
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

  async FollowedANewChannel(accessToken: string, params: Params): Promise<boolean> {
    const user = await this.twitchService.getAuthenticatedUserInformation(accessToken, params);
    const userId = getElemContentInParams(params, 'userId', 'undefined');
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(accessToken, [
      { name: 'userId', content: user.data[0].id },
    ]);
    const pastReccord = await this.findByUserId(userId, 'numberOfFollowedChannels');
    const record = new TwitchRecord();
    record.userId = userId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();
    const res = (await this.findOrUpdateLastRecord(record)).new;
    if (res && +pastReccord.content < +channels.total) {
      return true;
    }
    return false;
  }

  async UnfollowedAChannel(accessToken: string, params: Params): Promise<boolean> {
    const user = await this.twitchService.getAuthenticatedUserInformation(accessToken, params);
    const userId = getElemContentInParams(params, 'userId', 'undefined');
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(accessToken, [
      { name: 'userId', content: user.data[0].id },
    ]);
    const pastReccord = await this.findByUserId(userId, 'numberOfFollowedChannels');
    const record = new TwitchRecord();
    record.userId = userId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();
    const res = (await this.findOrUpdateLastRecord(record)).new;
    if (res && +pastReccord.content > +channels.total) {
      return true;
    }
    return false;
  }

  public availableActions = new Map([
    ['twitch/new-followed-channel/', this.FollowedANewChannel.bind(this)],
    ['twitch/unfollowed-channel/', this.UnfollowedAChannel.bind(this)],
  ]);
}
