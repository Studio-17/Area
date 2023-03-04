import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { DeezerService } from './deezer.service';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Controller('actions/deezer')
export class DeezerController {
  constructor(private readonly dezzerService: DeezerService) {}
  @Get('/ping')
  public async ping() {
    return 'Hello world';
  }

  @Post('/create-playlist')
  public async createPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const result = await this.dezzerService.createPlaylist(body);
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
