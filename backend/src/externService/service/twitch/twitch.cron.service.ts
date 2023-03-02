import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
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

  async FollowedANewChannel(actionParam: ActionParam): Promise<ActionResult> {
    const user = await this.twitchService.getAuthenticatedUserInformation(actionParam.accessToken);
    const userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(
      actionParam.accessToken,
      user.data[0].id,
    );
    const pastReccord = await this.findByUserId(userId, 'numberOfFollowedChannels');
    const record = new TwitchRecord();
    record.userId = userId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();
    const res = (await this.findOrUpdateLastRecord(record)).new;
    if (res && +pastReccord.content < +channels.total) {
      return {
        isTriggered: true,
        returnValues: [
          { name: 'broadcasterId', content: channels.data[0].broadcaster_id },
          { name: 'broadcasterName', content: channels.data[0].broadcaster_name },
        ],
      };
    }
    return { isTriggered: false };
  }

  async UnfollowedAChannel(actionParam: ActionParam): Promise<ActionResult> {
    const user = await this.twitchService.getAuthenticatedUserInformation(actionParam.accessToken);
    const userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(
      actionParam.accessToken,
      user.data[0].id,
    );
    const pastReccord = await this.findByUserId(userId, 'numberOfFollowedChannels');
    const record = new TwitchRecord();
    record.userId = userId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();
    const res = (await this.findOrUpdateLastRecord(record)).new;
    if (res && +pastReccord.content > +channels.total) {
      return { isTriggered: true };
    }
    return { isTriggered: false };
  }

  async AFollowedChannelIsOnStream(actionParam: ActionParam): Promise<ActionResult> {
    const user = await this.twitchService.getAuthenticatedUserInformation(actionParam.accessToken);
    const userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(
      actionParam.accessToken,
      user.data[0].id,
    );
    const channelName = getElemContentInParams(actionParam.params, 'channel', 'undefined');
    console.log(channelName);
    const channel = channels.data.find(
      (channel: any) => channel.broadcaster_name.toLowerCase() === channelName.toLowerCase(),
    );
    console.log(channel);
    if (!channel) {
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    }
    const res = await this.twitchService.getStream(actionParam.accessToken, channel.broadcaster_id);
    console.log(res);
    const record = new TwitchRecord();
    record.userId = userId;
    record.category = 'channelOnStream';
    record.content = res.data.length ? 'true' : 'false';
    const result = (await this.findOrUpdateLastRecord(record)).new;
    if (res.data.length && result) {
      return {
        isTriggered: true,
        returnValues: [
          { name: 'gameName', content: channel.data[0].game_name },
          { name: 'title', content: channel.data[0].title },
          { name: 'broadcasterName', content: channel.data[0].user_name },
          { name: 'viewerCount', content: channel.data[0].viewer_count },
          { name: 'startedAt', content: channel.data[0].started_at },
        ],
      };
    }
    return { isTriggered: false };
  }

  public availableActions = new Map<string, ActionFunction>([
    ['twitch/new-followed-channel/', this.FollowedANewChannel.bind(this)],
    ['twitch/unfollowed-channel/', this.UnfollowedAChannel.bind(this)],
    ['twitch/channel-on-stream/', this.AFollowedChannelIsOnStream.bind(this)],
  ]);
}
