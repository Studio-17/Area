import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { CreateSchedulesEventDto } from './dto/create-schedules-event.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Controller('actions/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post('/get/authenticated/user')
  public async getAuthenticatedUserInformation(@Res() response, @Body() body: ReactionDto) {
    try {
      const user = await this.discordService.getAuthenticatedUserInformation(body.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Got authenticated user from Discord services',
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching authenticated user from Discord Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/authenticated/user/guilds')
  public async getAuthenticatedUserGuilds(@Res() response, @Body() body: ReactionDto) {
    try {
      const user = await this.discordService.getAuthenticatedUserGuilds(body.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Got authenticated user from Discord services',
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching authenticated user from Discord Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/information')
  public async getGuildInformation(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildId = getElemContentInParams(body.params, 'guildId', '');
      const user = await this.discordService.getGuildInformation(guildId);

      return response.status(HttpStatus.OK).json({
        message: `Got information for guild from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting information for guild from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/channels')
  public async getGuildChannels(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildId = getElemContentInParams(body.params, 'guildId', '');
      const user = await this.discordService.getGuildChannels(guildId);

      return response.status(HttpStatus.OK).json({
        message: `Got channels for guild from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting channels for guild from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/invites')
  public async getGuildInvites(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildId = getElemContentInParams(body.params, 'guildId', '');
      const user = await this.discordService.getGuildInvites(guildId);

      return response.status(HttpStatus.OK).json({
        message: `Got invites for guild from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting invites for guild from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  //Action
  @Post('/get/guild/channel/message')
  public async getGuildChannelMessages(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildChannelId = getElemContentInParams(body.params, 'guildChannelId', '');
      const user = await this.discordService.getGuildChannelMessages(guildChannelId);

      return response.status(HttpStatus.OK).json({
        message: `Got messages for channel from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting messages for channel from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/channel/message/byId')
  public async getGuildChannelMessagesById(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildChannelId = getElemContentInParams(body.params, 'guildChannelId', '');
      const guildChannelMessageId = getElemContentInParams(
        body.params,
        'guildChannelMessageId',
        '',
      );

      const user = await this.discordService.getGuildChannelMessagesById(
        guildChannelId,
        guildChannelMessageId,
      );

      return response.status(HttpStatus.OK).json({
        message: `Got content for message from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting content for message from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  //Action
  @Post('/get/guild/scheduled-events')
  public async getGuildScheduledEvents(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildId = getElemContentInParams(body.params, 'guildId', '');
      const user = await this.discordService.getGuildScheduledEvents(guildId);

      return response.status(HttpStatus.OK).json({
        message: `Got scheduled-events for guild from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting scheduled-events for guild from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  //reAction
  @Post('/create/guild/scheduled-events')
  public async createGuildScheduledEvents(
    @Res() response,
    @Body()
    body: { guildChannelID: string; scheduledEvent: CreateSchedulesEventDto },
    // channel to link
    // @Body() body: ReactionDto,
  ) {
    try {
      const user = await this.discordService.createGuildScheduledEvents(
        body.guildChannelID,
        body.scheduledEvent,
      );

      return response.status(HttpStatus.OK).json({
        message: `Created scheduled-events for the guild from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error creating scheduled-events for the guild from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/scheduled-events/byId')
  public async getGuildScheduledEventsById(@Res() response, @Body() body: ReactionDto) {
    try {
      const guildId = getElemContentInParams(body.params, 'guildId', '');
      const scheduledEventId = getElemContentInParams(body.params, 'scheduledEventId', '');

      const user = await this.discordService.getGuildScheduledEventsById(guildId, scheduledEventId);

      return response.status(HttpStatus.OK).json({
        message: `Got scheduled-events for id from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting scheduled-events for id from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  //reAction
  @Post('/create/message')
  public async postGuildChannelMessage(
    @Res() response,
    @Body() body: { botToken: string; guildChannelID: string; createMessage: CreateMessageDto },
    // @Body() body: ReactionDto,
  ) {
    try {
      const user = await this.discordService.postGuildChannelMessage(
        body.guildChannelID,
        body.createMessage,
      );

      return response.status(HttpStatus.OK).json({
        message: `Posted message in channel ${body.guildChannelID} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error posting message in channel ${body.guildChannelID} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }
}
