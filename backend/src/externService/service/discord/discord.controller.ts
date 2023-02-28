import { Body, Controller, Post, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsGuard } from './guard/credentials.guard';
import { DiscordService } from './discord.service';
import { AuthorizeBotDto } from './dto/authorize-bot.dto';
import { GuildInformationDto } from './dto/guild-information.dto';
import { ChannelInformationDto } from './dto/channel-information.dto';
import { ChannelMessageInformationDto } from './dto/message-information.dto';
import { CreateSchedulesEventDto } from './dto/create-schedules-event.dto';
import { ScheduledEventInformationByIdDto } from './dto/scheduled-event-information.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('actions/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post('/get/authenticated/user')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getAuthenticatedUserInformation(@Req() request, @Res() response) {
    try {
      const user = await this.discordService.getAuthenticatedUserInformation(
        request.user.id,
        request.credentials.accessToken,
      );

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
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getAuthenticatedUserGuilds(@Req() request, @Res() response) {
    try {
      const user = await this.discordService.getAuthenticatedUserGuilds(
        request.user.id,
        request.credentials.accessToken,
      );

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
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildInformation(
    @Req() request,
    @Res() response,
    @Body() body: GuildInformationDto,
  ) {
    try {
      const user = await this.discordService.getGuildInformation(body.bot_token, body.guild_id);

      return response.status(HttpStatus.OK).json({
        message: `Got information for guild ${body.guild_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting information for guild ${body.guild_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/channels')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildChannels(
    @Req() request,
    @Res() response,
    @Body() body: GuildInformationDto,
  ) {
    try {
      const user = await this.discordService.getGuildChannels(body.bot_token, body.guild_id);

      return response.status(HttpStatus.OK).json({
        message: `Got channels for guild ${body.guild_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting channels for guild ${body.guild_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/invites')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildInvites(@Req() request, @Res() response, @Body() body: GuildInformationDto) {
    try {
      const user = await this.discordService.getGuildInvites(body.bot_token, body.guild_id);

      return response.status(HttpStatus.OK).json({
        message: `Got invites for guild ${body.guild_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting invites for guild ${body.guild_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/channel/message')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildChannelMessages(
    @Req() request,
    @Res() response,
    @Body() body: ChannelInformationDto,
  ) {
    try {
      const user = await this.discordService.getGuildChannelMessages(
        body.bot_token,
        body.guild_channel_id,
      );

      return response.status(HttpStatus.OK).json({
        message: `Got messages for channel ${body.guild_channel_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting messages for channel ${body.guild_channel_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/channel/message/byId')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildChannelMessagesById(
    @Req() request,
    @Res() response,
    @Body() body: ChannelMessageInformationDto,
  ) {
    try {
      const user = await this.discordService.getGuildChannelMessagesById(
        body.bot_token,
        body.guild_channel_id,
        body.message_id,
      );

      return response.status(HttpStatus.OK).json({
        message: `Got content for message ${body.message_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting content for message ${body.message_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/guild/scheduled-events')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildScheduledEvents(
    @Req() request,
    @Res() response,
    @Body() body: GuildInformationDto,
  ) {
    try {
      const user = await this.discordService.getGuildScheduledEvents(body.bot_token, body.guild_id);

      return response.status(HttpStatus.OK).json({
        message: `Got scheduled-events for guild ${body.guild_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting scheduled-events for guild ${body.guild_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/create/guild/scheduled-events')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async createGuildScheduledEvents(
    @Req() request,
    @Res() response,
    @Body()
    body: { botToken: string; guildChannelID: string; scheduledEvent: CreateSchedulesEventDto },
  ) {
    try {
      const user = await this.discordService.createGuildScheduledEvents(
        body.botToken,
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

  @Post('/get/guild/scheduled-events')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async getGuildScheduledEventsById(
    @Req() request,
    @Res() response,
    @Body() body: ScheduledEventInformationByIdDto,
  ) {
    try {
      const user = await this.discordService.getGuildScheduledEventsById(
        body.bot_token,
        body.guild_id,
        body.scheduled_event_id,
      );

      return response.status(HttpStatus.OK).json({
        message: `Got scheduled-events for id ${body.scheduled_event_id} from Discord services`,
        content: user,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error getting scheduled-events for id ${body.scheduled_event_id} from Discord Apis`,
        error: error,
        status: 400,
      });
    }
  }

  @Post('/create/message')
  @UseGuards(AuthGuard('jwt'), CredentialsGuard)
  public async postGuildChannelMessage(
    @Req() request,
    @Res() response,
    @Body() body: { botToken: string; guildChannelID: string; createMessage: CreateMessageDto },
  ) {
    try {
      const user = await this.discordService.postGuildChannelMessage(
        body.botToken,
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
