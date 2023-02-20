import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
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

  @Get('/check-pull-request')
  public async checkNewPullRequest(
    @Req() request,
    @Res() response,
    @Body()
    body: { accessToken: string; email: string; repositoryName: string; repositoryOwner: string },
  ) {
    try {
      const pullRequestResult = await this.githubService.updateLastPullRequest(
        body.accessToken,
        body.email,
        body.repositoryName,
        body.repositoryOwner,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last pull request from Github API',
        content: pullRequestResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching pull requests from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-issue')
  public async checkNewIssue(
    @Req() request,
    @Res() response,
    @Body()
    @Body()
    body: { accessToken: string; params?: { name: string; content: string }[] },
  ) {
    try {
      const pullRequestResult = await this.githubService.updateLastIssue(
        body.accessToken,
        body.params[0].content,
        body.params[1].content,
        body.params[2].content,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last issue from Github API',
        content: pullRequestResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching issue from Github API',
        error: error,
        status: 400,
      });
    }
  }
}
