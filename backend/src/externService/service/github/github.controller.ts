import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { CredentialsGuard } from './guard/credentials.guard';
import { CreateRepositoryDto } from './dto/repository/create-repository.dto';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ActionDto } from '../../../cron/dto/action.dto';
import { GithubCronService } from './github.cron.service';
import { GithubIssueDto } from './dto/github-issue.dto';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';

@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  // @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  // @Get('/get-repository')
  // public async pullRepository(@Req() request, @Res() response) {
  //   try {
  //     const gmailRecord = await this.githubService;
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got last email from Google services',
  //       content: gmailRecord,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching emails from Google Apis',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/check-pull-request')
  public async checkNewPullRequest(
    @Req() request,
    @Res() response,
    @Body() githubPullRequestDto: GithubPullRequestDto,
  ) {
    try {
      const pullRequestResult = await this.githubService.getPullRequest(
        request.credentials.accessToken,
        githubPullRequestDto,
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

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/check-issue')
  public async checkNewIssue(
    @Req() request,
    @Res() response,
    @Body() githubIssueDto: GithubIssueDto,
  ) {
    try {
      const pullRequestResult = await this.githubService.getIssue(
        request.credentials.accessToken,
        githubIssueDto,
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

  // @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  // @Get('/get-repository')
  // public async getAuthenticatedUserRepositories(@Req() request, @Res() response) {
  //   try {
  //     const userRepositories = await this.githubService.getAuthenticatedUserRepositories(
  //       request.credentials.accessToken,
  //     );
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got repositories list for the authenticated user using GitHub service',
  //       data: userRepositories,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching repositories from GitHub services',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }

  // @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  // @Get('/create-repository')
  // public async createAuthenticatedUserRepository(
  //   @Req() request,
  //   @Res() response,
  //   @Body() createRepositoryDto: CreateRepositoryDto,
  // ) {
  //   try {
  //     const userRepositories = await this.githubService.createAuthenticatedUserRepositories(
  //       request.credentials.accessToken,
  //       createRepositoryDto,
  //     );
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got repositories list for the authenticated user using GitHub service',
  //       data: userRepositories,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching repositories from GitHub services',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }

  // @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  // @Get('/fork-repository')
  // public async forkRepository(
  //   @Req() request,
  //   @Res() response,
  //   @Body() forkRepositoryDto: ForkRepositoryDto,
  // ) {
  //   try {
  //     const userRepositories = await this.githubService.forkRepository(
  //       request.credentials.accessToken,
  //       forkRepositoryDto,
  //     );
  //
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Got repositories list for the authenticated user using GitHub service',
  //       data: userRepositories,
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error fetching repositories from GitHub services',
  //       error: error,
  //       status: 400,
  //     });
  //   }
  // }
}
