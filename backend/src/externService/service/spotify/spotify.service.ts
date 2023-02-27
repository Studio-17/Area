import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { map } from 'rxjs';
import { SearchDto } from './dto/search.dto';
import { AddTrackPlaylistDto } from './dto/add-track-playlist.dto';

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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return playlist;
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return track;
  }

  public async addTrackToQueue(
    accessToken: string,
    params: { name: string; content: string }[],
  ): Promise<any> {
    let artist = '';
    try {
      artist = 'artist:' + params.find((param) => param.name === 'artist').content;
    } catch (error) {}
    let track = '';
    try {
      track = 'track:' + params.find((param) => param.name === 'track').content;
    } catch (error) {}
    if (artist === '' && track === '') {
      track = 'track:' + 'after the after';
      artist = 'artist:' + 'teeers';
    }
    const res = await this.searchAny(accessToken, { q: artist + ' ' + track, type: 'track' });
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

  public async createPlaylist(
    accessToken: string,
    params: { name: string; content: string }[],
  ): Promise<any> {
    const userId = (await this.getAuthenticatedUserInformation(accessToken)).id;
    let name = 'new Playlist';
    try {
      name = params.find((param) => param.name === 'name').content;
    } catch (error) {}
    let isPublic = false;
    try {
      isPublic = params.find((param) => param.name === 'public').content === 'true' ? true : false;
    } catch (error) {}

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

  public async addTrackToPlaylist(
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
