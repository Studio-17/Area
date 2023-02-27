import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsGuard } from './guard/credentials.guard';
import { DiscordService } from './discord.service';

@Controller('actions/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/user')
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

  @Get('/user/guilds')
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
}
