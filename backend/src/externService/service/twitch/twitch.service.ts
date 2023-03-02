import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { UserObject } from './interface/user-information.interface';
import { SoundTrackPlaylistObject } from './interface/soundtrack-playlist.interface';
import { GameAnalyticsObject } from './interface/game-anayltics.interface';
import { StreamDataObject } from './interface/streams.interface';
import { ChannelsFollowedObject } from './interface/channels-followed.interface';

@Injectable()
export class TwitchService {
  constructor(private readonly httpService: HttpService) {}

  public async getAuthenticatedUserInformation(accessToken: string): Promise<any> {
    const user = await lastValueFrom(
      this.httpService
        .get('https://api.twitch.tv/helix/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(UserObject, value.data);
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

  public async getAuthenticatedUserChannelsFollowed(
    accessToken: string,
    params: { name: string; content: string }[],
  ): Promise<any> {
    const channels = await lastValueFrom(
      this.httpService
        .get(
          `https://api.twitch.tv/helix/channels/followed?user_id=${
            params.find((param) => param.name === 'userId').content
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Client-Id': process.env.TWITCH_CLIENT_ID,
            },
          },
        )
        .pipe(
          map((value) => {
            return plainToInstance(ChannelsFollowedObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return channels;
  }

  public async getStream(accessToken: string, channelId: string): Promise<any> {
    const streams = await lastValueFrom(
      this.httpService
        .get(`https://api.twitch.tv/helix/streams?user_id=${channelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(StreamDataObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    // if streams is null => then is not live
    return streams;
  }

  public async getGameAnalytics(
    accessToken: string,
    params: { name: string; content: string }[],
  ): Promise<any> {
    const gamesAnalytics = await lastValueFrom(
      this.httpService
        .get(
          `https://api.twitch.tv/helix/analytics/games?game_id=${
            params.find((param) => param.name === 'gameId').content
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Client-Id': process.env.TWITCH_CLIENT_ID,
            },
          },
        )
        .pipe(
          map((value) => {
            return plainToInstance(GameAnalyticsObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return gamesAnalytics;
  }

  public async getBroadcastPlaylist(accessToken: string): Promise<any> {
    const playlist = await lastValueFrom(
      this.httpService
        .get(`https://api.twitch.tv/helix/soundtrack/playlists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
          },
        })
        .pipe(
          map((value) => {
            return plainToInstance(SoundTrackPlaylistObject, value.data);
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlist;
  }
}
