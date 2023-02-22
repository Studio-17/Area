import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios/index';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { SearchDto } from './dto/search.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddTrackPlaylistDto } from './dto/add-track-playlist.dto';

@Injectable()
export class SpotifyService {
  constructor(private readonly httpService: HttpService) {}

  public async getAuthenticatedUserInformation(userId: string, accessToken: string): Promise<any> {
    const user = await lastValueFrom(
      this.httpService
        .get('https://api.spotify.com/v1/me', {
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

  public async getAuthenticatedUserTopArtists(userId: string, accessToken: string): Promise<any> {
    const artists = await firstValueFrom(
      this.httpService
        .get('https://api.spotify.com/v1/me/top/artists', {
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

    return artists;
  }

  public async getAuthenticatedUserTopTracks(userId: string, accessToken: string): Promise<any> {
    const tracks = await firstValueFrom(
      this.httpService
        .get('https://api.spotify.com/v1/me/top/tracks', {
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

    return tracks;
  }

  public async searchAny(userId: string, accessToken: string, search: SearchDto): Promise<any> {
    const searchResult = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/search?q=${search.q}&type=${search.type}`, {
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

    return searchResult;
  }

  public async getAuthenticatedUserCurrentlyPlayingTrack(
    userId: string,
    accessToken: string,
  ): Promise<any> {
    const currentPlayingTrack = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/me/player/currently-playing`, {
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

    return currentPlayingTrack;
  }

  public async playCurrentTrack(userId: string, accessToken: string): Promise<any> {
    const playPausedTrack = await lastValueFrom(
      this.httpService
        .put(`https://api.spotify.com/v1/me/player/play`, null, {
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

    return playPausedTrack;
  }

  public async pauseCurrentTrack(userId: string, accessToken: string): Promise<any> {
    const playPausedTrack = await lastValueFrom(
      this.httpService
        .put(`https://api.spotify.com/v1/me/player/pause`, null, {
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

    return playPausedTrack;
  }

  public async playNextAudioTrack(userId: string, accessToken: string): Promise<any> {
    const nextTrack = await lastValueFrom(
      this.httpService
        .post(`https://api.spotify.com/v1/me/player/next`, null, {
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

    return nextTrack;
  }

  public async playPreviousAudioTrack(userId: string, accessToken: string): Promise<any> {
    const previousTrack = await lastValueFrom(
      this.httpService
        .post(`https://api.spotify.com/v1/me/player/previous`, null, {
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

    return previousTrack;
  }

  public async followPlaylist(
    userId: string,
    accessToken: string,
    playlistId: string,
  ): Promise<any> {
    const followedPlaylist = await firstValueFrom(
      this.httpService
        .put(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, null, {
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

    return followedPlaylist;
  }

  public async unfollowPlaylist(
    userId: string,
    accessToken: string,
    playlistId: string,
  ): Promise<any> {
    const unfollowedPlaylist = await firstValueFrom(
      this.httpService
        .delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
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

    return unfollowedPlaylist;
  }

  public async getPlaylist(userId: string, accessToken: string, playlistId: string): Promise<any> {
    const playlist = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
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

    return playlist;
  }

  public async getAlbums(userId: string, accessToken: string, albumId: string): Promise<any> {
    const album = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/albums/${albumId}`, {
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

    return album;
  }

  public async getArtist(userId: string, accessToken: string, artistId: string): Promise<any> {
    const artist = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/artists/${artistId}`, {
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

    return artist;
  }

  public async getTrack(userId: string, accessToken: string, trackId: string): Promise<any> {
    const track = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
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

    return track;
  }

  public async addTrackToQueue(userId: string, accessToken: string, uri: string): Promise<any> {
    const queue = await firstValueFrom(
      this.httpService
        .post(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, null, {
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

    return queue;
  }

  public async createPlaylist(
    userId: string,
    accessToken: string,
    playlist: CreatePlaylistDto,
  ): Promise<any> {
    const playlistCreated = await lastValueFrom(
      this.httpService
        .post(
          `https://api.spotify.com/v1/users/${playlist.userId}/playlists`,
          {
            name: playlist.name,
            public: playlist.public,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlistCreated;
  }

  public async addTrackToPlaylist(
    userId: string,
    accessToken: string,
    trackList: AddTrackPlaylistDto,
  ): Promise<any> {
    const playlistUpdated = await firstValueFrom(
      this.httpService
        .post(
          `https://api.spotify.com/v1/playlists/${trackList.userId}/tracks`,
          {
            uris: [trackList.uri],
            position: '0',
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlistUpdated;
  }
}
