import { Controller, Get, HttpStatus, Req, Res, Body, Post, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';

// @UseGuards(JwtAuthenticationGuard)
@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/check-pull-requests')
  public async checkNewPullRequest(
    @Req() request,
    @Res() response,
    @Body()
    body: { accessToken: string; email: string; repositoryName: string; repositoryOwner: string },
  ) {
    try {
      console.log('----- TEST -----');
      const pullRequestResult = await this.githubService.updateLastPullRequest(
        body.accessToken,
        body.email,
        body.repositoryName,
        body.repositoryOwner,
      );
      console.log('----- TEST 1 -----');

      console.log(pullRequestResult);

      console.log('----- TEST 2 -----');

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

  // @Get('/check-issues')
  // public async checkIfMailReceived(
  //   @Req() request,
  //   @Res() response,
  //   @Body() body: { accessToken: string; email: string },
  // ) {
  //   try {
  //     const issueResult = await this.githubService.updateLastIssue(body.accessToken, body.email);
  //
  //     console.log(issueResult);
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got last email from Google services',
  //       content: issueResult,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching pull requests from Github Api',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }
}
