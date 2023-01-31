import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosError } from 'axios';
import { GmailRecordDto } from './dto/gmail/gmail.dto';
import { Cron } from '@nestjs/schedule';
import { CredentialsService } from 'src/credentials/credentials.service';
import { ActionService } from 'src/action/action.service';
import { MyActionService } from 'src/myAction/myAction.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(GmailRecord)
    private readonly gmailRecordRepository: Repository<GmailRecord>,
    private readonly credentialsService: CredentialsService,
    private readonly actionService: ActionService,
    private readonly myActionService: MyActionService,
    private readonly httpService: HttpService,
  ) {}

  @Cron('10 * * * * *')
  async handleCron() {
    const credentials = await this.credentialsService.findByService('google');

    for (const credential of credentials) {
      const mail = await this.updateLastEmailReceived(credential.accessToken, credential.email);
      if (mail.new) {
        const action = await this.actionService.findByLink('google/check-mail/');
        const relatedActions = await this.myActionService.findByActionId(action.uuid);

        for (const relatedAction of relatedActions) {
          const linkedReaction = await this.myActionService.findByLinkedFromId(relatedAction.uuid);

          for (const linked of linkedReaction) {
            const reaction = await this.actionService.findOne(linked.actionId);
            await firstValueFrom(
              this.httpService
                .post<any>('http://localhost:3000/api/reaccoon/actions/' + reaction.link, {
                  accessToken: credential.accessToken,
                  filename: mail.mail.lastEmailId,
                })
                .pipe(
                  catchError((error: AxiosError) => {
                    throw new HttpException(error, HttpStatus.BAD_REQUEST);
                  }),
                ),
            );
          }
        }
      }
    }
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
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
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
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
      } else {
        return { new: false, mail: record };
      }
    }
  }

  public async updateLastEmailReceived(accessToken: string, email: string) {
    const config = {
      method: 'get',
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const emailId = await axios(config)
        .then(function (apiResponse): string {
          return apiResponse.data.messages[0].id;
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      console.log('emailId (to be updated):', emailId);

      if (emailId) {
        const record = new GmailRecordDto();
        record.email = email;
        record.lastEmailId = emailId;

        return await this.findOrUpdateLastEmailReceived(record);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });

    return fileId;
  }

  public async getCredentialsForApi(email: string): Promise<any> {
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/reaccoon/credentials',
      data: {
        email: email,
        service: 'google',
      },
    };

    const credentials = await axios(config)
      .then(function (apiResponse) {
        return apiResponse;
      })
      .catch(function (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
        return new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }
}
