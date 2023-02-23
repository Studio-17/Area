import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { RepositoriesList } from './interface/repositories-list.interface';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { CreateRepositoryDto } from './dto/repository/create-repository.dto';
import { RepositoryCreated } from './interface/repository-create.interface';
import { ForkRepositoryDto } from './dto/repository/fork-repository.dto';
import { ForkedRepository } from './interface/fork-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { GithubPullRequestEntity } from './entity/github-pull-request.entity';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import { GithubIssueEntity } from './entity/github-issue.entity';
import { GithubIssueDto } from './dto/github-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(GithubPullRequestEntity)
    private readonly githubPullRequestRepository: Repository<GithubPullRequestEntity>,
    @InjectRepository(GithubIssueEntity)
    private readonly githubIssueRepository: Repository<GithubIssueEntity>,
  ) {}

  public async getAuthenticatedUserRepositories(
    userId: string,
    accessToken: string,
  ): Promise<RepositoriesList> {
    const repositories = await firstValueFrom(
      this.httpService
        .get('https://api.github.com/user/repos', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(RepositoriesList, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return repositories;
  }

  public async createAuthenticatedUserRepositories(
    userId: string,
    accessToken: string,
    createRepositoryDto: CreateRepositoryDto,
  ): Promise<RepositoryCreated> {
    const repository = await firstValueFrom(
      this.httpService
        .post('https://api.github.com/user/repos', {
          data: createRepositoryDto,
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(RepositoryCreated, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return repository;
  }

  public async forkRepository(
    userId: string,
    accessToken: string,
    forkRepositoryDto: ForkRepositoryDto,
  ): Promise<ForkedRepository> {
    const forkedRepository = await firstValueFrom(
      // Beware of the params in the route, they may be invalid
      this.httpService
        .post(
          `https://api.github.com/repos/${forkRepositoryDto.owner}/${forkRepositoryDto.repo}/forks`,
          {
            data: forkRepositoryDto,
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          map((value) => {
            return plainToInstance(ForkedRepository, value.data);
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

  public async findPullRequest(
    repositoryOwner: string,
    repositoryName: string,
  ): Promise<GithubPullRequestEntity> {
    try {
      const records = await this.githubPullRequestRepository.findOneBy({
        repositoryOwner: repositoryOwner,
        repositoryName: repositoryName,
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      return undefined;
    }
  }

  public async findIssue(
    repositoryOwner: string,
    repositoryName: string,
  ): Promise<GithubIssueEntity> {
    try {
      const records = await this.githubIssueRepository.findOneBy({
        repositoryOwner: repositoryOwner,
        repositoryName: repositoryName,
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastPullRequest(githubPullRequestDto: GithubPullRequestDto) {
    const record = await this.findPullRequest(
      githubPullRequestDto.repositoryName,
      githubPullRequestDto.repositoryOwner,
    );

    if (!record) {
      try {
        return {
          new: true,
          data: await this.githubPullRequestRepository.save(githubPullRequestDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (record.pullRequestId.toString() !== githubPullRequestDto.pullRequestId.toString()) {
      try {
        const newRecord = await this.githubPullRequestRepository.update(
          {
            pullRequestId: record.pullRequestId,
          },
          { ...githubPullRequestDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findPullRequest(
            githubPullRequestDto.repositoryName,
            githubPullRequestDto.repositoryOwner,
          ),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async findOrUpdateLastIssue(githubIssueDto: GithubIssueDto) {
    const record = await this.findIssue(
      githubIssueDto.repositoryOwner,
      githubIssueDto.repositoryName,
    );

    if (!record) {
      try {
        return {
          new: true,
          data: await this.githubIssueRepository.save(githubIssueDto),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else if (record.issueId.toString() !== githubIssueDto.issueId.toString()) {
      try {
        const newRecord = await this.githubIssueRepository.update(
          {
            issueId: record.issueId,
          },
          { ...githubIssueDto },
        );

        if (!newRecord) {
          throw new NotFoundException(`Record does not exist`);
        }

        return {
          new: true,
          data: await this.findIssue(githubIssueDto.repositoryOwner, githubIssueDto.repositoryName),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async updateLastPullRequest(accessToken: string, owner: string, repo: string) {
    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };

    try {
      const pullRequestId = await axios(config)
        .then(function (apiResponse): string {
          if (apiResponse.data.length === 0) {
            return;
          }
          return apiResponse.data[0].id;
        })
        .catch(function (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
        });

      if (pullRequestId) {
        const record = new GithubPullRequestEntity();
        record.repositoryName = repo;
        record.repositoryOwner = owner;
        record.pullRequestId = pullRequestId;

        return await this.findOrUpdateLastPullRequest(record);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async updateLastIssue(accessToken: string, owner: string, repo: string) {
    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/issues`,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };

    try {
      const issueId = await axios(config)
        .then(function (apiResponse): string {
          if (apiResponse.data.length === 0) {
            return;
          }
          return apiResponse.data[0].id;
        })
        .catch(function (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
        });

      if (issueId) {
        const record = new GithubIssueEntity();
        record.repositoryName = repo;
        record.repositoryOwner = owner;
        record.issueId = issueId;

        return await this.findOrUpdateLastIssue(record);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }
}
