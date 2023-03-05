import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubIssueDto } from './dto/github-issue.dto';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import { ReactionDto } from '../../../cron/dto/reaction.dto';
import { GithubForkDto } from './dto/github-fork.dto';
import { GithubCheckStarDto } from './dto/star/github-check-star.dto';
import { GithubReviewCommentDto } from './dto/github-review-comment.dto';
import { GithubContributorDto } from './dto/github-contributor.dto';
import { GithubTeamDto } from './dto/github-team.dto';
import { GithubInvitationDto } from './dto/github-invitation.dto';
import { GithubMilestoneDto } from './dto/github-milestone.dto';
import { getElemContentInParams } from '../../../cron/utils/getElemContentInParams';

@Controller('actions/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  // TODO - LIST
  // --- REACTIONS ---
  // UPDATE A BRANCH
  // ADD A COLLABORATOR
  // REMOVE A COLLABORATOR
  // DELETE AN INVITATION
  // CREATE AN ISSUE
  // CREATE A LABEL
  // DELETE A LABEL
  // CREATE A MILESTONE
  // DELETE A MILESTONE
  // DELETE A REPOSITORY

  @Get('/check-repository')
  public async checkNewUserRepository(@Req() request, @Res() response) {
    try {
      const repositoryResult = await this.githubService.getUserRepository(
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last user repository from Github API',
        content: repositoryResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching user repository from Github API',
        error: error,
        status: 400,
      });
    }
  }

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
        message: 'Error fetching pull request from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-issue')
  public async checkNewIssue(
    @Req() request,
    @Res() response,
    @Body() githubIssueDto: GithubIssueDto,
  ) {
    try {
      const issueResult = await this.githubService.getIssue(
        request.credentials.accessToken,
        githubIssueDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last issue from Github API',
        content: issueResult,
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

  @Get('/check-user-issue')
  public async checkNewUserIssue(@Req() request, @Res() response) {
    try {
      const issueResult = await this.githubService.getUserIssue(request.credentials.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Got last user issue from Github API',
        content: issueResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching user issue from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-review-comment')
  public async checkNewReviewComment(
    @Req() request,
    @Res() response,
    @Body() githubReviewCommentDto: GithubReviewCommentDto,
  ) {
    try {
      const reviewCommentResult = await this.githubService.getReviewComment(
        request.credentials.accessToken,
        githubReviewCommentDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last issue from Github API',
        content: reviewCommentResult,
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

  @Get('/check-star')
  public async checkNewStar(
    @Req() request,
    @Res() response,
    @Body() githubStarDto: GithubCheckStarDto,
  ) {
    try {
      const starResult = await this.githubService.getStar(
        request.credentials.accessToken,
        githubStarDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last star from Github API',
        content: starResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching star from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-user-star')
  public async checkNewUserStar(@Req() request, @Res() response) {
    try {
      const starResult = await this.githubService.getUserStar(request.credentials.accessToken);

      return response.status(HttpStatus.OK).json({
        message: 'Got last user star from Github API',
        content: starResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching user star from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-milestone')
  public async checkNewMilestone(
    @Req() request,
    @Res() response,
    @Body() githubMilestoneDto: GithubMilestoneDto,
  ) {
    try {
      const milestoneResult = await this.githubService.getMilestone(
        request.credentials.accessToken,
        githubMilestoneDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last milestone from Github API',
        content: milestoneResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching milestone from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-contributor')
  public async checkNewContributor(
    @Req() request,
    @Res() response,
    @Body() githubContributorDto: GithubContributorDto,
  ) {
    try {
      const contributorResult = await this.githubService.getContributor(
        request.credentials.accessToken,
        githubContributorDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last contributor from Github API',
        content: contributorResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching contributor from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-team')
  public async checkNewTeam(@Req() request, @Res() response, @Body() githubTeamDto: GithubTeamDto) {
    try {
      const teamResult = await this.githubService.getTeam(
        request.credentials.accessToken,
        githubTeamDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last team from Github API',
        content: teamResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching team from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-invitation')
  public async checkNewInvitation(
    @Req() request,
    @Res() response,
    @Body() githubInvitationDto: GithubInvitationDto,
  ) {
    try {
      const invitationResult = await this.githubService.getInvitation(
        request.credentials.accessToken,
        githubInvitationDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last invitation from Github API',
        content: invitationResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching invitation from Github API',
        error: error,
        status: 400,
      });
    }
  }

  @Get('/check-fork')
  public async checkFork(@Req() request, @Res() response, @Body() githubForkDto: GithubForkDto) {
    try {
      const forkResult = await this.githubService.getFork(
        request.credentials.accessToken,
        githubForkDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got last fork from Github API',
        content: forkResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching fork from Github API',
        error: error,
        status: 400,
      });
    }
  }

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

  @Post('/fork-repository')
  public async forkRepository(@Req() request, @Res() response, @Body() reactionDto: ReactionDto) {
    try {
      const userRepositories = await this.githubService.forkRepository(reactionDto.accessToken, {
        owner: getElemContentInParams(reactionDto.params, 'owner', '', reactionDto.returnValues),
        repo: getElemContentInParams(reactionDto.params, 'repo', '', reactionDto.returnValues),
        name: getElemContentInParams(reactionDto.params, 'name', '', reactionDto.returnValues),
        default_branch_only:
          getElemContentInParams(
            reactionDto.params,
            'default_branch_only',
            '',
            reactionDto.returnValues,
          ) === 'true',
      });

      return response.status(HttpStatus.OK).json({
        message: 'Got repositories list for the authenticated user using GitHub service',
        data: userRepositories,
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching repositories from GitHub services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/star-repository')
  public async starRepository(@Req() request, @Res() response, @Body() reactionDto: ReactionDto) {
    try {
      const star = await this.githubService.starRepository(reactionDto.accessToken, {
        owner: getElemContentInParams(reactionDto.params, 'owner', '', reactionDto.returnValues),
        repo: getElemContentInParams(reactionDto.params, 'repo', '', reactionDto.returnValues),
      });

      return response.status(HttpStatus.OK).json({
        message: 'Successfully starred repository',
        data: star,
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error starring repository from GitHub services',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/unstar-repository')
  public async unstarRepository(@Req() request, @Res() response, @Body() reactionDto: ReactionDto) {
    try {
      const star = await this.githubService.unstarRepository(reactionDto.accessToken, {
        owner: getElemContentInParams(reactionDto.params, 'owner', '', reactionDto.returnValues),
        repo: getElemContentInParams(reactionDto.params, 'repo', '', reactionDto.returnValues),
      });

      return response.status(HttpStatus.OK).json({
        message: 'Successfully unstarred repository',
        data: star,
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error unstarring repository from GitHub services',
        error: error,
        status: 400,
      });
    }
  }
}
