import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { GmailRecordDto } from './dto/gmail/gmail.dto';
import { ServiceList } from '../../../service/entity/service.entity';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(GmailRecord)
    private readonly gmailRecordRepository: Repository<GmailRecord>,
  ) {}

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

  public async findOrUpdateLastEmailReceived(gmailRecord: GmailRecordDto): Promise<boolean> {
    const record = await this.findByEmail(gmailRecord.email);

    if (!record) {
      try {
        await this.gmailRecordRepository.save(gmailRecord);
        return false;
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

          return true;
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
        }
      } else {
        return false;
      }
    }
  }

  // TODO: add a fuction to get the content of the mail to return it
  public async updateLastEmailReceived(actionParam: ActionParam): Promise<ActionResult> {
    const config = {
      method: 'get',
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1`,
      headers: {
        Authorization: `Bearer ${actionParam.accessToken}`,
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
        record.email = getElemContentInParams(actionParam.params, 'userId', '');
        record.lastEmailId = emailId;

        return {
          isTriggered: await this.findOrUpdateLastEmailReceived(record),
          returnValues: [],
        };
      }
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  public async createGoogleDocOnDrive(body: ReactionDto): Promise<string> {
    const filename = getElemContentInParams(body.params, 'filename', 'Untitled', body.returnValues);
    console.log('filename', filename);
    const config = {
      method: 'post',
      url: 'https://www.googleapis.com/drive/v3/files',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${body.accessToken}`,
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
        throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });

    return fileId;
  }

  public async getCredentialsForApi(email: string): Promise<any> {
    const config = {
      method: 'get',
      url: `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/credentials`,
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
        throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
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
        return new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });
  }
}
