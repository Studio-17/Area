import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { CredentialsGuard } from './guard/credentials.guard';
import { CreateRepositoryDto } from './dto/repository/create-repository.dto';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

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
        [{name: 'repo', content: body.repositoryName},
        { name: 'owner', content: body.repositoryOwner }],
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
  public async checkNewIssue(@Res() response, @Body() body: ReactionDto) {
    try {
      const pullRequestResult = await this.githubService.updateLastIssue(
        body.accessToken,
        body.params,
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

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-repository')
  public async getAuthenticatedUserRepositories(@Req() request, @Res() response) {
    try {
      const userRepositories = await this.githubService.getAuthenticatedUserRepositories(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got repositories list for the authenticated user using GitHub service',
        data: userRepositories,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching repositories from GitHub services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/create-repository')
  public async createAuthenticatedUserRepository(
    @Req() request,
    @Res() response,
    @Body() createRepositoryDto: CreateRepositoryDto,
  ) {
    try {
      const userRepositories = await this.githubService.createAuthenticatedUserRepositories(
        request.user.id,
        request.credentials.accessToken,
        createRepositoryDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got repositories list for the authenticated user using GitHub service',
        data: userRepositories,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching repositories from GitHub services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/fork-repository')
  public async forkRepository(
    @Req() request,
    @Res() response,
    @Body() forkRepositoryDto: ForkRepositoryDto,
  ) {
    try {
      const userRepositories = await this.githubService.forkRepository(
        request.user.id,
        request.credentials.accessToken,
        forkRepositoryDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got repositories list for the authenticated user using GitHub service',
        data: userRepositories,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching repositories from GitHub services',
        error: error,
        status: 400,
      });
    }
  }
}
