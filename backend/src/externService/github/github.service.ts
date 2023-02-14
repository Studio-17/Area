import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GithubPullRequestEntity } from './entity/github-pull-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosError } from 'axios';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CredentialsService } from 'src/credentials/credentials.service';
import { ActionService } from 'src/action/action.service';
import { MyActionService } from 'src/myAction/myAction.service';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { GithubPullRequestDto } from './dto/github-pull-request.dto';
import { GithubIssueEntity } from './entity/github-issue.entity';

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(GithubPullRequestEntity)
    private readonly githubPullRequestRepository: Repository<GithubPullRequestEntity>,
    @InjectRepository(GithubIssueEntity)
    private readonly githubIssueRepository: Repository<GithubIssueEntity>,
    private readonly credentialsService: CredentialsService,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // async handleCronReaction(
  //   userId: string,
  //   actionLink: string,
  //   accessToken: string,
  //   params: [{ name: string; content: string }],
  // ) {
  //   const action = await this.actionService.findByLink(actionLink);
  //   const relatedActions = await this.myActionService.findByActionAndUserId(action.uuid, userId);
  //
  //   for (const relatedAction of relatedActions) {
  //     const linkedReaction = await this.myActionService.findByLinkedFromId(relatedAction.uuid);
  //
  //     for (const linked of linkedReaction) {
  //       const reaction = await this.actionService.findOne(linked.actionId);
  //       await firstValueFrom(
  //         this.httpService
  //           .post<any>('http://localhost:3000/api/reaccoon/actions/' + reaction.link, {
  //             accessToken: accessToken,
  //             filename: params,
  //           })
  //           .pipe(
  //             catchError((error: AxiosError) => {
  //               throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
  //             }),
  //           ),
  //       );
  //     }
  //   }
  // }
  //
  // async handleCron(userId: string, params?: [{ name: string; content: string }]) {
  //   const user = await this.userService.findById(userId);
  //   if (!user) {
  //     return;
  //   }
  //
  //   let credential;
  //   try {
  //     credential = await this.credentialsService.findById(user.email, 'google');
  //   } catch (error: any) {
  //     return;
  //   }
  //
  //   const mail = await this.updateLastEmailReceived(credential.accessToken, credential.email);
  //   if (mail.new) {
  //     params.push({ name: 'actionParam', content: mail.mail.uuid });
  //     this.handleCronReaction(userId, 'google/check-mail/', credential.accessToken, params);
  //   }
  // }
  //
  // // TODO ajouter la vérification de si il existe déjà / revoir si on le fait pas à partir de l'uuid du myaction
  // public async addCron(body: CreateCronDto) {
  //   const job = new CronJob(
  //     body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
  //     this.handleCron.bind(this, body.userId, body.params),
  //   );
  //   this.schedulerRegistry.addCronJob(body.name, job);
  //   job.start();
  // }
  //

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

  public async updateLastPullRequest(
    accessToken: string,
    email: string,
    owner: string,
    repo: string,
  ) {

    console.log(accessToken)
    console.log(email)
    console.log(owner)
    console.log(repo)

    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(config);

    try {
      const pullRequestId = await axios(config)
        .then(function (apiResponse): string {
          console.log('aaa')
          if (apiResponse.data.length === 0) {
            return;
          }
          return apiResponse.data[0].id;
        })
        .catch(function (error) {
          console.log('bbb');
          console.log(error)
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
        });
      console.log('pullRequestId (to be updated):', pullRequestId);

      console.log('======');
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

  public async createGoogleDocOnDrive(accessToken: string, filename: string): Promise<string> {
    const config = {
      method: 'post',
      url: 'https://www.googleapis.com/drive/v3/files',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
      data: {
        name: filename,
      },
    };

    const fileId = await axios(config)
      .then(function (apiResponse) {
        return apiResponse.data.id;
      })
      .catch(function (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });

    return fileId;
  }

  public async getCredentialsForApi(email: string): Promise<any> {
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/reaccoon/credentials',
      data: {
        email: email,
        service: 'github',
      },
    };

    const credentials = await axios(config)
      .then(function (apiResponse) {
        return apiResponse;
      })
      .catch(function (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });

    return credentials;
  }

  // public async getEmailContent(accessToken: string, emailId: string): Promise<any> {
  // const config = {
  //     method: 'get',
  //       url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}`,
  //       headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //
  //   axios(config)
  //     .then(function (apiResponse) {
  //       return apiResponse;
  //     })
  //     .catch(function (error) {
  //       return new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
  //     });
  // }
}
