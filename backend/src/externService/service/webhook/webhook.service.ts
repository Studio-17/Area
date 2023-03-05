import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  public async getWebhook(url: string): Promise<any> {
    const data = await lastValueFrom(
      this.httpService
        .get(url, null)
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return data;
  }

  public async postWebhook(url: string): Promise<any> {
    const data = await lastValueFrom(
      this.httpService
        .post(url, null)
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return data;
  }
}
