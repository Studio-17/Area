import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { map } from 'rxjs';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ForkedRepository } from './interface/fork-repository.interface';
import { GithubCronService } from './github.cron.service';
import { GithubIssueDto } from './dto/github-issue.dto';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import { GithubForkDto } from './dto/github-fork.dto';
import {GithubStarDto} from "./dto/github-star.dto";

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => GithubCronService))
    private readonly githubCronService: GithubCronService,
  ) {}

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

  // public async getAuthenticatedUserRepositories(accessToken: string): Promise<RepositoriesList> {
  //   const repositories = await firstValueFrom(
  //     this.httpService
  //       .get('https://api.github.com/user/repos', {
  //         headers: {
  //           Accept: 'application/vnd.github+json',
  //           Authorization: `Bearer ${accessToken}`,
  //           'X-GitHub-Api-Version': '2022-11-28',
  //         },
  //       })
  //       .pipe(
  //         map((value) => {
  //           return plainToInstance(RepositoriesList, value.data);
  //         }),
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //         }),
  //       ),
  //   );
  //
  //   return repositories;
  // }

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

  public async getStar(accessToken: string, githubStarDto: GithubStarDto) {
    const star = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos/${githubStarDto.owner}/${githubStarDto.repo}/issues`, {
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
}
