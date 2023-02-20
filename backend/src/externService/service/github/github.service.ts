import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';
import { GithubPullRequestEntity } from './entity/github-pull-request.entity';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import axios, { AxiosError } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubIssueEntity } from './entity/github-issue.entity';
import { GithubIssueDto } from './dto/github-issue.dto';
import { ServiceList } from '../../../service/entity/service.entity';
import { CreateCronDto } from '../google/dto/gmail/add-cron.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from '../../../user/user.service';
import { CredentialsService } from '../../../credentials/credentials.service';
import { catchError, firstValueFrom } from 'rxjs';
import { MyActionService } from '../../../myAction/myAction.service';
import { ActionService } from '../../../action/action.service';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(GithubPullRequestEntity)
    private readonly githubPullRequestRepository: Repository<GithubPullRequestEntity>,
    @InjectRepository(GithubIssueEntity)
    private readonly githubIssueRepository: Repository<GithubIssueEntity>,
    private readonly userService: UserService,
    private readonly credentialsService: CredentialsService,
    private schedulerRegistry: SchedulerRegistry,
    private readonly actionService: ActionService,

    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async getRepository() {}

  // TODO - Externalize this function
  async handleCronReaction(userId: string, actionLink: string, accessToken: string) {
    const action = await this.actionService.findByLink(actionLink);
    const relatedActions = await this.myActionService.findByActionAndUserId(action.uuid, userId);

    for (const relatedAction of relatedActions) {
      const linkedReaction = await this.myActionService.findByLinkedFromId(relatedAction.uuid);

      for (const linked of linkedReaction) {
        const reaction = await this.actionService.findOne(linked.actionId);
        await firstValueFrom(
          this.httpService
            .post<any>('http://localhost:3000/api/reaccoon/actions/' + reaction.link, {
              accessToken: accessToken,
              params: linked.params,
            })
            .pipe(
              catchError((error: AxiosError) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
              }),
            ),
        );
      }
    }
  }

  public async addPullRequestCron(body: CreateCronDto) {
    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.handleCheckPullRequestCron.bind(this, body.userId, body.params),
    );
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }

  public async addIssueCron(body: CreateCronDto) {
    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.handleCheckIssueCron.bind(this, body.userId, body.params),
    );
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }

  async handleCheckPullRequestCron(userId: string, params?: { name: string; content: string }[]) {
    // TODO: check if user exists sinon skip car on a déjà l'id
    const user = await this.userService.findById(userId);
    if (!user) {
      return;
    }

    let credential;
    try {
      credential = await this.credentialsService.findById(user.uuid, ServiceList.GITHUB);
      console.log('GITHUB CREDENTIALS', credential);
    } catch (error: any) {
      return;
    }

    try {
      const pullRequest = await this.updateLastPullRequest(
        credential.accessToken,
        params[0].content,
        params[1].content,
        params[2].content,
      );
      if (pullRequest.new) {
        await this.handleCronReaction(userId, 'github/check-pull-request/', credential.accessToken);
      }
    } catch (error: any) {
      return;
    }
  }

  async handleCheckIssueCron(userId: string, params?: { name: string; content: string }[]) {
    // TODO: check if user exists sinon skip car on a déjà l'id
    const user = await this.userService.findById(userId);
    if (!user) {
      return;
    }
    let credential;
    try {
      credential = await this.credentialsService.findById(user.uuid, ServiceList.GITHUB);
    } catch (error: any) {
      return;
    }

    try {
      const issue = await this.updateLastIssue(
        credential.accessToken,
        params[0].content,
        params[1].content,
        params[2].content,
      );
      if (issue.new) {
        await this.handleCronReaction(userId, 'github/check-issue/', credential.accessToken);
      }
    } catch (error: any) {
      return;
    }
  }

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
            githubIssueDto.repositoryOwner,
            githubIssueDto.repositoryName,
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
