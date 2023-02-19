import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GithubPullRequestEntity } from './entity/github-pull-request.entity';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubIssueEntity } from './entity/github-issue.entity';
import { GithubIssueDto } from './dto/github-issue.dto';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(GithubPullRequestEntity)
    private readonly githubPullRequestRepository: Repository<GithubPullRequestEntity>,
    @InjectRepository(GithubIssueEntity)
    private readonly githubIssueRepository: Repository<GithubIssueEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async getRepository() {}

  public async findPullRequest(
    email: string,
    repositoryOwner: string,
    repositoryName: string,
  ): Promise<GithubPullRequestEntity> {
    try {
      const records = await this.githubPullRequestRepository.findOneBy({
        email: email,
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
    email: string,
    repositoryOwner: string,
    repositoryName: string,
  ): Promise<GithubIssueEntity> {
    try {
      const records = await this.githubIssueRepository.findOneBy({
        email: email,
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
      githubPullRequestDto.email,
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
    } else if (record.pullRequestId !== githubPullRequestDto.pullRequestId) {
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
            githubPullRequestDto.email,
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
      githubIssueDto.email,
      githubIssueDto.repositoryName,
      githubIssueDto.repositoryOwner,
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
    } else if (record.issueId !== githubIssueDto.issueId) {
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
          data: await this.findIssue(
            githubIssueDto.email,
            githubIssueDto.repositoryName,
            githubIssueDto.repositoryOwner,
          ),
        };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      return { new: false, data: record };
    }
  }

  public async updateLastPullRequest(
    accessToken: string,
    email: string,
    owner: string,
    repo: string,
  ) {
    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        record.email = email;
        record.repositoryName = repo;
        record.repositoryOwner = owner;
        record.pullRequestId = pullRequestId;

        return await this.findOrUpdateLastPullRequest(record);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async updateLastIssue(accessToken: string, email: string, owner: string, repo: string) {
    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/issues`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        record.email = email;
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
