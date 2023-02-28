import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { DeezerService } from './deezer.service';
import { CredentialsGuard } from './guard/credentials.guard';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Controller('actions/deezer')
export class DeezerController {
  constructor(private readonly dezzerService: DeezerService) {}
  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/ping')
  public async ping() {
    return 'Hello world';
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/create-playlist')
  public async createPlaylist(@Req() request, @Res() response) {
    try {
      const result = await this.dezzerService.createPlaylist(request.credentials.accessToken);
      return response.status(HttpStatus.OK).json({
        message: 'Created playlist for the authenticated user using Deezer service',
        data: result,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error when creating playlist for Deezer sevrices',
        error: error,
        status: 400,
      });
    }
  }
}
