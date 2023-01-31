import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { GmailRecordDto } from './dto/gmail/gmail.dto';

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

  public async findOrUpdateLastEmailReceived(gmailRecord: GmailRecordDto): Promise<GmailRecordDto> {
    const record = await this.findByEmail(gmailRecord.email);

    if (!record) {
      try {
        return await this.gmailRecordRepository.save(gmailRecord);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else {
      try {
        console.log('preparing to update database with new record');
        const record = await this.gmailRecordRepository.update(
          {
            lastEmailId: gmailRecord.lastEmailId,
          },
          { ...gmailRecord },
        );

        console.log('record updated:', record);

        if (!record) {
          throw new NotFoundException(`Record does not exist`);
        }

        return this.findByEmail(gmailRecord.email);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async updateLastEmailReceived(
    accessToken: string,
    email: string,
  ): Promise<GmailRecordDto> {
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
