import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { map } from 'rxjs';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ForkedRepository } from './interface/fork-repository.interface';
import { GithubIssueDto } from './dto/github-issue.dto';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import { GithubForkDto } from './dto/github-fork.dto';
import { GithubCheckStarDto } from './dto/star/github-check-star.dto';
import { GithubReviewCommentDto } from './dto/github-review-comment.dto';
import { GithubContributorDto } from './dto/github-contributor.dto';
import { GithubTeamDto } from './dto/github-team.dto';
import { GithubInvitationDto } from './dto/github-invitation.dto';
import { GithubMilestoneDto } from './dto/github-milestone.dto';
import { GithubStarRepositoryDto } from './dto/star/github-star-repository.dto';
import { GithubUnstarRepositoryDto } from './dto/star/github-unstar-repository.dto';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  public async forkRepository(
    accessToken: string,
    forkRepositoryDto: ForkRepositoryDto,
  ): Promise<ForkedRepository> {
    const forkedRepository = await firstValueFrom(
      this.httpService
        .post(
          `https://api.github.com/repos/${forkRepositoryDto.owner}/${forkRepositoryDto.repo}/forks`,
          {
            name: forkRepositoryDto.name,
            default_branch_only: forkRepositoryDto.default_branch_only,
          },
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return forkedRepository;
  }

  public async starRepository(
    accessToken: string,
    starRepositoryDto: GithubStarRepositoryDto,
  ): Promise<ForkedRepository> {
    const starredRepository = await firstValueFrom(
      this.httpService
        .put(
          `https://api.github.com/user/starred/${starRepositoryDto.owner}/${starRepositoryDto.repo}`,
          {},
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return starredRepository;
  }

  public async unstarRepository(
    accessToken: string,
    unstarRepositoryDto: GithubUnstarRepositoryDto,
  ): Promise<ForkedRepository> {
    const unstarredRepository = await firstValueFrom(
      this.httpService
        .delete(
          `https://api.github.com/user/starred/${unstarRepositoryDto.owner}/${unstarRepositoryDto.repo}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return unstarredRepository;
  }

  public async getFork(accessToken: string, githubForkDto: GithubForkDto) {
    const forkedRepository = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos/${githubForkDto.owner}/${githubForkDto.repo}/forks`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (forkedRepository.length) {
      return forkedRepository[0].id;
    }
    return '0';
  }

  public async getUserRepository(accessToken: string) {
    const repository = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (repository.length) {
      return repository[0].id;
    }
    return '0';
  }

  // public async createAuthenticatedUserRepositories(
  //   accessToken: string,
  //   createRepositoryDto: CreateRepositoryDto,
  // ): Promise<RepositoryCreated> {
  //   const repository = await firstValueFrom(
  //     this.httpService
  //       .post('https://api.github.com/user/repos', {
  //         data: createRepositoryDto,
  //         headers: {
  //           Accept: 'application/vnd.github+json',
  //           Authorization: `Bearer ${accessToken}`,
  //           'X-GitHub-Api-Version': '2022-11-28',
  //         },
  //       })
  //       .pipe(
  //         map((value) => {
  //           return plainToInstance(RepositoryCreated, value.data);
  //         }),
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //         }),
  //       ),
  //   );
  //
  //   return repository;
  // }

  public async getPullRequest(accessToken: string, githubPullRequestDto: GithubPullRequestDto) {
    const pullRequest = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubPullRequestDto.owner}/${githubPullRequestDto.repo}/pulls`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    if (pullRequest.length) {
      return pullRequest[0].id;
    }
    return '0';
  }

  public async getIssue(accessToken: string, githubIssueDto: GithubIssueDto) {
    const issue = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos/${githubIssueDto.owner}/${githubIssueDto.repo}/issues`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (issue.length) {
      return issue[0].id;
    }
    return '0';
  }

  public async getUserIssue(accessToken: string) {
    const issue = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/issues`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (issue.length) {
      return issue[0].id;
    }
    return '0';
  }

  public async getStar(accessToken: string, githubStarDto: GithubCheckStarDto) {
    const star = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubStarDto.owner}/${githubStarDto.repo}/stargazers`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (star.length) {
      return star[0].id;
    }
    return '0';
  }

  public async getUserStar(accessToken: string) {
    const star = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/user/starred`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (star.length) {
      return star[0].id;
    }
    return '0';
  }

  public async getTeam(accessToken: string, githubTeamDto: GithubTeamDto) {
    const team = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos/${githubTeamDto.owner}/${githubTeamDto.repo}/teams`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (team.length) {
      return team[0].id;
    }
    return '0';
  }

  public async getInvitation(accessToken: string, githubInvitationDto: GithubInvitationDto) {
    const invitation = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubInvitationDto.owner}/${githubInvitationDto.repo}/invitations`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (invitation.length) {
      return invitation[0].id;
    }
    return '0';
  }

  public async getMilestone(accessToken: string, githubMilestoneDto: GithubMilestoneDto) {
    const milestone = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubMilestoneDto.owner}/${githubMilestoneDto.repo}/milestones`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (milestone.length) {
      return milestone[0].id;
    }
    return '0';
  }

  public async getContributor(accessToken: string, githubContributorDto: GithubContributorDto) {
    const contributor = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubContributorDto.owner}/${githubContributorDto.repo}/contributors`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (contributor.length) {
      return contributor[0].id;
    }
    return '0';
  }

  public async getReviewComment(
    accessToken: string,
    githubReviewCommentDto: GithubReviewCommentDto,
  ) {
    const reviewComment = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/repos/${githubReviewCommentDto.owner}/${githubReviewCommentDto.repo}/pulls/comments`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    if (reviewComment.length) {
      return reviewComment[0].id;
    }
    return '0';
  }
}
