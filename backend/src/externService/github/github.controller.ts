import { Controller, Get, HttpStatus, Req, Res, Body, Post, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import {ApiTags} from "@nestjs/swagger";

// @UseGuards(JwtAuthenticationGuard)
@ApiTags('Extern Service')
@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  // @Get('/check-pull-requests')
  // public async checkNewPullRequest(
  //   @Req() request,
  //   @Res() response,
  //   @Body()
  //   body: { accessToken: string; email: string; repositoryName: string; repositoryOwner: string },
  // ) {
  //   try {
  //     const pullRequestResult = await this.githubService.updateLastPullRequest(
  //       body.accessToken,
  //       body.email,
  //       body.repositoryName,
  //       body.repositoryOwner,
  //     );
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got last pull request from Github API',
  //       content: pullRequestResult,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching pull requests from Github API',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }

  // @Get('/check-issues')
  // public async checkIfMailReceived(
  //   @Req() request,
  //   @Res() response,
  //   @Body() body: { accessToken: string; email: string },
  // ) {
  //   try {
  //     const issueResult = await this.githubService.updateLastIssue(body.accessToken, body.email);
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
