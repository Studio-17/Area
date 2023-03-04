import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionRecord } from 'src/cron/entity/actionRecord.entity';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { TwitchService } from './twitch.service';

@Injectable()
export class TwitchCronService {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly cronService: CronService,
  ) {}

  async FollowedANewChannel(actionParam: ActionParam): Promise<ActionResult> {
    const user = await this.twitchService.getAuthenticatedUserInformation(actionParam.accessToken);
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(
      actionParam.accessToken,
      user.data[0].id,
    );
    const pastReccord = await this.cronService.findByActionId(
      actionParam.myActionId,
      'numberOfFollowedChannels',
    );
    const record = new ActionRecord();
    record.myActionId = actionParam.myActionId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();
    const res = await this.cronService.findOrUpdateLastRecord(record);
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
    const channels = await this.twitchService.getAuthenticatedUserChannelsFollowed(
      actionParam.accessToken,
      user.data[0].id,
    );
    const pastReccord = await this.cronService.findByActionId(
      actionParam.myActionId,
      'numberOfFollowedChannels',
    );
    const record = new ActionRecord();
    record.myActionId = actionParam.myActionId;
    record.category = 'numberOfFollowedChannels';
    record.content = channels.total.toString();

    const res = await this.cronService.findOrUpdateLastRecord(record);
    if (res && +pastReccord.content > +channels.total) {
      return { isTriggered: true };
    }
    return { isTriggered: false };
  }

  async AFollowedChannelIsOnStream(actionParam: ActionParam): Promise<ActionResult> {
    const user = await this.twitchService.getAuthenticatedUserInformation(actionParam.accessToken);
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
    const record = new ActionRecord();
    record.myActionId = actionParam.myActionId;
    record.category = 'channelOnStream';
    record.content = res.data.length ? 'true' : 'false';
    const result = await this.cronService.findOrUpdateLastRecord(record);
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
