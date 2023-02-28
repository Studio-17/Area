import { HttpService } from '@nestjs/axios';
import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class DeezerService {
  constructor(private readonly httpService: HttpService) {}
  public async getAuthentificatedUserInformation(accessToken: string): Promise<any> {
    const user = await lastValueFrom(
      this.httpService
        .get('https://api.deezer.com/user/me', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    return user;
  }

  public async createPlaylist(accessToken: string): Promise<any> {
    console.log(accessToken);
    const user = this.getAuthentificatedUserInformation(accessToken);
    return user;
  }
}
