import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ServiceList } from '../../../service/entity/service.entity';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { ActionRecord } from 'src/cron/entity/actionRecord.entity';
import { CronService } from 'src/cron/cron.service';

@Injectable()
export class GoogleService {
  constructor(private readonly cronService: CronService) {}

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
        const record = new ActionRecord();
        record.myActionId = actionParam.myActionId;
        record.category = 'lastMail';
        record.content = emailId;
        const mailContent = await this.getEmailContent(actionParam.accessToken, emailId);
        return {
          isTriggered: await this.cronService.findOrUpdateLastRecord(record),
          returnValues: [
            { name: 'mailTitle', content: mailContent.snippet },
            {
              name: 'mailContent',
              content: Buffer.from(mailContent.payload.parts[0].body.data, 'base64').toString(
                'binary',
              ),
            },
            { name: 'mailId', content: emailId },
          ],
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

    return axios(config)
      .then(function (apiResponse) {
        return apiResponse.data;
      })
      .catch(function (error) {
        return new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
      });
  }
}
