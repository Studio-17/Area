import { Body, Controller, Post, HttpStatus, Req, Res } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { ReactionDto } from '../../../cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Controller('actions/twitch')
export class TwitchController {
  constructor(private readonly spotifyService: TwitchService) {}

  @Post('/get/user')
  public async getAuthenticatedUserInformation(
    @Req() request,
    @Res() response,
    @Body() body: ReactionDto,
  ) {
    try {
      const userInformation = await this.spotifyService.getAuthenticatedUserInformation(
        body.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got information for the authenticated user using Twitch service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching information for user from Twitch services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/user/channels/followed')
  public async getAuthenticatedUserChannelsFollowed(
    @Req() request,
    @Res() response,
    @Body() body: ReactionDto,
  ) {
    try {
      const userId = getElemContentInParams(
        body.params,
        'twitchUserId',
        'undefined',
        body.returnValues,
      );
      const userInformation = await this.spotifyService.getAuthenticatedUserChannelsFollowed(
        body.accessToken,
        userId,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got channels followed by user for the authenticated user using Twitch service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching channels followed for user from Twitch services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/user/streams')
  public async getAuthenticatedUserStreams(
    @Req() request,
    @Res() response,
    @Body() body: ReactionDto,
  ) {
    try {
      const channelId = getElemContentInParams(
        body.params,
        'channelId',
        'undefined',
        body.returnValues,
      );

      const userInformation = await this.spotifyService.getStream(body.accessToken, channelId);

      return response.status(HttpStatus.OK).json({
        message: 'Got streams for the authenticated user using Twitch service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching streams for user from Twitch services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/game-analytics')
  public async getGameAnalytics(@Req() request, @Res() response, @Body() body: ReactionDto) {
    try {
      const userInformation = await this.spotifyService.getGameAnalytics(
        body.accessToken,
        body.params,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got game analytics url using Twitch service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching game analytics from Twitch services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/playlist')
  public async getBroadcastPlaylist(@Req() request, @Res() response, @Body() body: ReactionDto) {
    try {
      const userInformation = await this.spotifyService.getBroadcastPlaylist(body.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Got broadcast playlist using Twitch service',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching broadcast playlist from Twitch services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/update-chat-color')
  public async updateChatColor(@Res() response, @Body() body: ReactionDto) {
    try {
      const userInformation = await this.spotifyService.updateUserColorChat(body.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Update color chat user',
        userInformation,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error while updating user color chat',
        error: error,
        status: 400,
      });
    }
  }
}
