import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { CredentialsGuard } from './guard/credentials.guard';
import { CreateRepositoryDto } from './dto/repository/create-repository.dto';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';

@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

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
