import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { CredentialsGuard } from './guard/credentials.guard';
import { SearchDto } from './dto/search.dto';
import { SpotifyObjectDto } from './dto/spotify-object.dto';
import { TrackDto } from './dto/track.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddTrackPlaylistDto } from './dto/add-track-playlist.dto';

@Controller('actions/spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/user')
  public async getAuthenticatedUserInformation(@Req() request, @Res() response) {
    try {
      const userTopArtists = await this.spotifyService.getAuthenticatedUserInformation(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got top artists list for the authenticated user using Spotify service',
        data: userTopArtists,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching top artists from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-top-artists')
  public async getAuthenticatedUserTopArtists(@Req() request, @Res() response) {
    try {
      const userTopArtists = await this.spotifyService.getAuthenticatedUserTopArtists(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got top artists list for the authenticated user using Spotify service',
        data: userTopArtists,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching top artists from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-top-tracks')
  public async getAuthenticatedUserTopTracks(@Req() request, @Res() response) {
    try {
      const userTopTracks = await this.spotifyService.getAuthenticatedUserTopTracks(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got top tracks list for the authenticated user using Spotify service',
        data: userTopTracks,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching top tracks from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/search')
  public async searchAny(@Req() request, @Res() response, @Body() searchDto: SearchDto) {
    try {
      const searchResult = await this.spotifyService.searchAny(
        request.user.id,
        request.credentials.accessToken,
        searchDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got search result for the authenticated user query using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching search result from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-current-playing-track')
  public async getCurrentPlayingTrack(@Req() request, @Res() response) {
    try {
      const searchResult = await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got repositories list for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching repositories from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/play-resume-current-track')
  public async playPauseCurrentPlayingTrack(@Req() request, @Res() response) {
    try {
      const searchResult = await this.spotifyService.playCurrentTrack(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Set current track play resume for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error play resume the current track from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/pause-current-track')
  public async pauseCurrentPlayingTrack(@Req() request, @Res() response) {
    try {
      const searchResult = await this.spotifyService.pauseCurrentTrack(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Set current track pause for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error pausing the current track from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/play-next-track')
  public async playNextTrack(@Req() request, @Res() response) {
    try {
      const nextTrack = await this.spotifyService.playNextAudioTrack(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message:
          'Set current playing track to next in queue for the authenticated user using Spotify service',
        data: nextTrack,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error setting the next track as currently playing from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/play-previous-track')
  public async playPreviousTrack(@Req() request, @Res() response) {
    try {
      const previousTrack = await this.spotifyService.playPreviousAudioTrack(
        request.user.id,
        request.credentials.accessToken,
      );

      return response.status(HttpStatus.OK).json({
        message:
          'Set current playing track to previous in queue for the authenticated user using Spotify service',
        data: previousTrack,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error setting the previous track as currently playing from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/follow-playlist')
  public async followPlaylist(@Req() request, @Res() response, @Body() playlist: SpotifyObjectDto) {
    try {
      const searchResult = await this.spotifyService.followPlaylist(
        request.user.id,
        request.credentials.accessToken,
        playlist.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Followed playlist for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error following playlist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/unfollow-playlist')
  public async unfollowPlaylist(
    @Req() request,
    @Res() response,
    @Body() playlist: SpotifyObjectDto,
  ) {
    try {
      const searchResult = await this.spotifyService.unfollowPlaylist(
        request.user.id,
        request.credentials.accessToken,
        playlist.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Unfollowed playlist for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error unfollowing playlist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-playlists')
  public async getPlaylists(@Req() request, @Res() response, @Body() playlist: SpotifyObjectDto) {
    try {
      const searchResult = await this.spotifyService.getPlaylist(
        request.user.id,
        request.credentials.accessToken,
        playlist.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got playlist for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting playlist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-albums')
  public async getAlbums(@Req() request, @Res() response, @Body() album: SpotifyObjectDto) {
    try {
      const searchResult = await this.spotifyService.getAlbums(
        request.user.id,
        request.credentials.accessToken,
        album.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got album for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting album from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-artists')
  public async getArtists(@Req() request, @Res() response, @Body() artist: SpotifyObjectDto) {
    try {
      const searchResult = await this.spotifyService.getArtist(
        request.user.id,
        request.credentials.accessToken,
        artist.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got artist for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting artist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/get-tracks')
  public async getTracks(@Req() request, @Res() response, @Body() track: TrackDto) {
    try {
      const searchResult = await this.spotifyService.getTrack(
        request.user.id,
        request.credentials.accessToken,
        track.id,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got track for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting track from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/add-track-to-queue')
  public async addTrackToQueue(@Req() request, @Res() response, @Body() track: TrackDto) {
    try {
      const searchResult = await this.spotifyService.addTrackToQueue(
        request.user.id,
        request.credentials.accessToken,
        track.uri,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Got track for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting track from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/create-playlist')
  public async createPlaylist(
    @Req() request,
    @Res() response,
    @Body() playlist: CreatePlaylistDto,
  ) {
    try {
      const searchResult = await this.spotifyService.createPlaylist(
        request.user.id,
        request.credentials.accessToken,
        playlist,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Created playlist for the authenticated user using Spotify service',
        data: searchResult,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating playlist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/add-track-to-playlist')
  public async addTrackToPlaylist(
    @Req() request,
    @Res() response,
    @Body() trackAndPlaylist: AddTrackPlaylistDto,
  ) {
    try {
      const tracksToAdd = await this.spotifyService.addTrackToPlaylist(
        request.user.id,
        request.credentials.accessToken,
        trackAndPlaylist,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Added track to the playlist for the authenticated user using Spotify service',
        data: tracksToAdd,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error adding track to playlist from Spotify services',
        error: error,
        status: 400,
      });
    }
  }
}
