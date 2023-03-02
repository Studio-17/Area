import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Injectable()
export class DeezerService {
  constructor(private readonly httpService: HttpService) {}
  public async getAuthentificatedUserInformation(accessToken: string): Promise<any> {
    const user = await lastValueFrom(
      this.httpService
        .get('https://api.deezer.com/user/me', {
          headers: {
            Accept: 'application/json',
          },
          params: { access_token: accessToken },
        })
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
    return user;
  }

  public async getPlaylists(accessToken: string): Promise<any> {
    const playlists = await lastValueFrom(
      this.httpService
        .get(`https://api.deezer.com/user/me/playlists?access_token=${accessToken}`)
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
    return playlists;
  }

  public async getFavoriteArtists(accessToken: string): Promise<any> {
    const playlists = await lastValueFrom(
      this.httpService
        .get(`https://api.deezer.com/user/me/artists?access_token=${accessToken}`)
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
    return playlists;
  }

  public async createPlaylist(body: ReactionDto): Promise<any> {
    const name = getElemContentInParams(
      body.params,
      'name',
      'New Reaccoon Playlist',
      body.returnValues,
    );
    const playlistCreated = await lastValueFrom(
      this.httpService
        .post(
          `https://api.deezer.com/user/me/playlists?title=${name}&access_token=${body.accessToken}`,
        )
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
    return playlistCreated;
  }
}
