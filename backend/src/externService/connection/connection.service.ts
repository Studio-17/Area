import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ConnectionService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly httpService: HttpService) {}

  public async connectToGoogleService(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>('http://reaccoon-oauth2:4000/api/reaccoon/oauth2/google').pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
        }),
      ),
    );
    return data;
  }
}
