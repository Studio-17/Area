import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/get-repository')
  @UseGuards(AuthGuard('jwt'))
  public async pullRepository(@Req() request, @Res() response) {
    try {
      const gmailRecord = await this.githubService;

      return response.status(HttpStatus.OK).json({
        message: 'Got last email from Google services',
        content: gmailRecord,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching emails from Google Apis',
        error: error,
        status: 400,
      });
    }
  }
}
