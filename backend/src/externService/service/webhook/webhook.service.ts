import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  public async getWebhook(body: ReactionDto): Promise<any> {
    const url = getElemContentInParams(body.params, 'url', undefined, body.returnValues);
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
}
