import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { map } from 'rxjs';
import { SearchDto } from './dto/search.dto';
import { Params } from 'src/cron/cron.type';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';

@Injectable()
export class SpotifyService {
  constructor(private readonly httpService: HttpService) {}

  public async getAuthenticatedUserInformation(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return user;
  }

  public async getAuthenticatedUserTopArtists(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return artists;
  }

  public async getAuthenticatedUserTopTracks(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return tracks;
  }

  public async searchAny(accessToken: string, search: SearchDto): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return searchResult;
  }

  public async getAuthenticatedUserCurrentlyPlayingTrack(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    if (currentPlayingTrack) {
      if (currentPlayingTrack.item) {
        return currentPlayingTrack.item.id;
      }
    }
    return '';
  }

  public async playCurrentTrack(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playPausedTrack;
  }

  public async pauseCurrentTrack(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playPausedTrack;
  }

  public async playNextAudioTrack(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return nextTrack;
  }

  public async playPreviousAudioTrack(accessToken: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return previousTrack;
  }

  public async followPlaylist(accessToken: string, playlistId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return followedPlaylist;
  }

  public async unfollowPlaylist(accessToken: string, playlistId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return unfollowedPlaylist;
  }

  public async getPlaylist(accessToken: string, playlistId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlist;
  }

  public async getUserPlaylist(accessToken: string, userId: string): Promise<any> {
    const userPlaylist = await firstValueFrom(
      this.httpService
        .get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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

    return userPlaylist;
  }


  public async getAlbums(accessToken: string, albumId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return album;
  }

  public async getArtist(accessToken: string, artistId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return artist;
  }

  public async getTrack(accessToken: string, trackId: string): Promise<any> {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return track;
  }

  public async addTrackToQueue(accessToken: string, params: Params): Promise<any> {
    let artist = getElemContentInParams(params, 'artist', '');
    let track = getElemContentInParams(params, 'track', '');
    if (artist === '' && track === '') {
      track = 'after the after';
      artist = 'teeers';
    }
    const res = await this.searchAny(accessToken, {
      q: 'artist:' + artist + ' track:' + track,
      type: 'track',
    });
    const queue = await firstValueFrom(
      this.httpService
        .post(`https://api.spotify.com/v1/me/player/queue?uri=${res.tracks.items[0].uri}`, null, {
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return queue;
  }

  public async createPlaylist(accessToken: string, params: Params): Promise<any> {
    const userId = (await this.getAuthenticatedUserInformation(accessToken)).id;
    const name = getElemContentInParams(params, 'name', 'new Playlist');
    const isPublic = getElemContentInParams(params, 'public', 'false') === 'true' ? true : false;

    const playlistCreated = await lastValueFrom(
      this.httpService
        .post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            name: name,
            public: isPublic,
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
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlistCreated;
  }

  public async addTrackToPlaylist(accessToken: string, params: Params): Promise<any> {
    const user = await this.getAuthenticatedUserInformation(accessToken);
    let track = getElemContentInParams(params, 'track', '');
    let artist = getElemContentInParams(params, 'artist', '');
    const playlistName = getElemContentInParams(params, 'playlist', 'tinktok');

    if (artist === '' && track === '') {
      track = 'after the after';
      artist = 'teeers';
    }

    const trackRes = await this.searchAny(accessToken, {
      q: 'artirst:' + artist + ' track:' + track,
      type: 'track',
    });

    // const playlistRes = // get the user playlists
    // const playlistUpdated = await firstValueFrom(
    //   this.httpService
    //     .post(
    //       `https://api.spotify.com/v1/playlists/${user.id}/tracks`,
    //       {
    //         uris: [trackRes.tracks.items[0].uri],
    //         position: '0',
    //       },
    //       {
    //         headers: {
    //           Accept: 'application/json',
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       },
    //     )
    //     .pipe(
    //       map((value) => {
    //         return value.data;
    //       }),
    //     )
    //     .pipe(
    //       catchError((error: AxiosError) => {
    //         throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
    //       }),
    //     ),
    // );

    // return playlistUpdated;
    return '';
  }
}
