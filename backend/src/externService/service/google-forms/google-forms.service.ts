import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ReactionDto } from '../../../cron/dto/reaction.dto';
import { getElemContentInParams } from '../../../cron/utils/getElemContentInParams';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleFormsService {
  constructor(private readonly httpService: HttpService) {}

  public async listForms(body: ReactionDto): Promise<any> {
    const forms = await lastValueFrom(
      this.httpService
        .get(
          'https://www.googleapis.com/drive/v3/files?q=mimeType%20%3D%20%27application%2Fvnd.google-apps.form%27',
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body.accessToken}`,
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
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return forms;
  }

  public async getGoogleFormById(body: ReactionDto): Promise<any> {
    const formId = getElemContentInParams(body.params, 'formId', '', body.returnValues);

    const form = await lastValueFrom(
      this.httpService
        .get(`https://forms.googleapis.com/v1/forms/${formId}`, {
          headers: {
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return form;
  }

  public async createGoogleForm(body: ReactionDto): Promise<any> {
    const title = getElemContentInParams(body.params, 'title', '', body.returnValues);
    const description = getElemContentInParams(body.params, 'description', '', body.returnValues);
    const questionTitle = getElemContentInParams(
      body.params,
      'questionTitle',
      '',
      body.returnValues,
    );
    const questionDescription = getElemContentInParams(
      body.params,
      'questionDescription',
      '',
      body.returnValues,
    );

    const form = await lastValueFrom(
      this.httpService
        .post(
          `https://forms.googleapis.com/v1/forms`,
          {
            info: {
              title: title,
              description: description,
            },
            items: [
              {
                title: questionTitle,
                description: questionDescription,
                questionItem: {
                  question: {
                    textQuestion: {
                      paragraph: false,
                    },
                  },
                },
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${body.accessToken}`,
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
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return form;
  }

  public async getGoogleFormResponseById(body: ReactionDto): Promise<any> {
    const formId = getElemContentInParams(body.params, 'formId', '', body.returnValues);
    const responseId = getElemContentInParams(body.params, 'responseId', '', body.returnValues);

    const response = await lastValueFrom(
      this.httpService
        .get(`https://forms.googleapis.com/v1/forms/${formId}/responses/${responseId}`, {
          headers: {
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return response;
  }

  public async listGoogleFormResponses(body: ReactionDto): Promise<any> {
    const formId = getElemContentInParams(body.params, 'formId', '', body.returnValues);

    const formResponses = await lastValueFrom(
      this.httpService
        .get(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
          headers: {
            Authorization: `Bearer ${body.accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error.message, error.status);
          }),
        ),
    );

    return formResponses;
  }
}
