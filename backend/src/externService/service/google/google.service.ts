import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosError } from 'axios';
import { GmailRecordDto } from './dto/gmail/gmail.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CredentialsService } from 'src/credentials/credentials.service';
import { ActionService } from 'src/action/action.service';
import { MyActionService } from 'src/myAction/myAction.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CronJob } from 'cron';
import { CreateCronDto } from './dto/gmail/add-cron.dto';
import { UserService } from 'src/user/user.service';
import { ServiceList } from '../../../service/entity/service.entity';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(GmailRecord)
    private readonly gmailRecordRepository: Repository<GmailRecord>,
    private readonly credentialsService: CredentialsService,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

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
                // console.log(error);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
              }),
            ),
        );
      }
    }
  }

  // TODO - Rename handleCron
  async handleCron(userId: string, params?: { name: string; content: string }[]) {
    // TODO: check if user exists sinon skip car on a déjà l'id
    const user = await this.userService.findById(userId);
    if (!user) {
      return;
    }

    let credential;
    try {
      credential = await this.credentialsService.findById(user.uuid, ServiceList.GOOGLE);
    } catch (error: any) {
      return;
    }

    try {
      const mail = await this.updateLastEmailReceived(credential.accessToken, user.uuid);
      if (mail.new) {
        // params.push({ name: 'actionParam', content: mail.mail.uuid });
        await this.handleCronReaction(userId, 'google/check-mail/', credential.accessToken);
      }
    } catch (error: any) {
      return;
    }
  }

  // TODO ajouter la vérification de si il existe déjà / revoir si on le fait pas à partir de l'uuid du myaction
  public async addCron(body: CreateCronDto) {
    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.handleCron.bind(this, body.userId, body.params),
    );
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }

  public async findByEmail(email: string): Promise<GmailRecord> {
    try {
      const records = await this.gmailRecordRepository.findOneBy({
        email: email,
      });

      if (!records) {
        return undefined;
      }

      return records;
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastEmailReceived(gmailRecord: GmailRecordDto) {
    const record = await this.findByEmail(gmailRecord.email);

    if (!record) {
      try {
        return { new: true, mail: await this.gmailRecordRepository.save(gmailRecord) };
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    } else {
      if (record.lastEmailId !== gmailRecord.lastEmailId) {
        try {
          const newrecord = await this.gmailRecordRepository.update(
            {
              lastEmailId: record.lastEmailId,
            },
            { ...gmailRecord },
          );

          if (!newrecord) {
            throw new NotFoundException(`Record does not exist`);
          }

          return { new: true, mail: await this.findByEmail(gmailRecord.email) };
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
        }
      } else {
        return { new: false, mail: record };
      }
    }
  }

  public async updateLastEmailReceived(accessToken: string, userId: string) {

    const config = {
      method: 'get',
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      console.log('try to get last email');
      const emailId = await axios(config)
        .then(function (apiResponse): string {
          return apiResponse.data.messages[0].id;
        })
        .catch(function (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
        });

      console.log('emailId (to be updated):', emailId);

      if (emailId) {
        const record = new GmailRecordDto();
        record.email = userId;
        record.lastEmailId = emailId;

        return await this.findOrUpdateLastEmailReceived(record);
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
        // TODO - Update accessToken by the good one
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
        console.log(JSON.stringify(error));
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
        service: ServiceList.GOOGLE,
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

  public async getEmailContent(accessToken: string, emailId: string): Promise<any> {
    const config = {
      method: 'get',
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios(config)
      .then(function (apiResponse) {
        return apiResponse;
      })
      .catch(function (error) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });
  }
}
