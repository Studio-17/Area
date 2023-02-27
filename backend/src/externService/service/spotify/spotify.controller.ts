import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { CredentialsGuard } from './guard/credentials.guard';
import { SearchDto } from './dto/search.dto';
import { SpotifyObjectDto } from './dto/spotify-object.dto';
import { TrackDto } from './dto/track.dto';
import { AddTrackPlaylistDto } from './dto/add-track-playlist.dto';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Controller('actions/spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Get('/user')
  public async getAuthenticatedUserInformation(@Req() request, @Res() response) {
    try {
      const userTopArtists = await this.spotifyService.getAuthenticatedUserInformation(
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

  @Post('/play-resume-current-track')
  public async playPauseCurrentPlayingTrack(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.playCurrentTrack(body.accessToken);

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

  @Post('/pause-current-track')
  public async pauseCurrentPlayingTrack(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.pauseCurrentTrack(body.accessToken);

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

  @Post('/play-next-track')
  public async playNextTrack(@Res() response, @Body() body: ReactionDto) {
    try {
      const nextTrack = await this.spotifyService.playNextAudioTrack(body.accessToken);

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

  @Post('/play-previous-track')
  public async playPreviousTrack(@Res() response, @Body() body: ReactionDto) {
    try {
      const previousTrack = await this.spotifyService.playPreviousAudioTrack(body.accessToken);

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
  public async followPlaylist(@Res() response, @Body() playlist: SpotifyObjectDto, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.followPlaylist(body.accessToken, playlist.id);

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
    @Res() response,
    @Body() playlist: SpotifyObjectDto,
    @Body() body: ReactionDto,
  ) {
    try {
      const searchResult = await this.spotifyService.unfollowPlaylist(
        body.accessToken,
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
  public async getPlaylists(@Res() response, @Body() playlist: SpotifyObjectDto, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.getPlaylist(body.accessToken, playlist.id);

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
  public async getAlbums(@Res() response, @Body() album: SpotifyObjectDto, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.getAlbums(body.accessToken, album.id);

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
  public async getArtists(@Res() response, @Body() artist: SpotifyObjectDto, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.getArtist(body.accessToken, artist.id);

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
  public async getTracks(@Res() response, @Body() track: TrackDto, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.getTrack(body.accessToken, track.id);

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

  @Post('/add-track-to-queue')
  public async addTrackToQueue(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.addTrackToQueue(body.accessToken, body.params);

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

  // @UseGuards(JwtAuthenticationGuard, CredentialsGuard)
  @Post('/create-playlist')
  public async createPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.createPlaylist(
        // body.accessToken,
        body.accessToken,
        body.params,
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
    @Res() response,
    @Body() trackAndPlaylist: AddTrackPlaylistDto,
    @Body() body: ReactionDto,
  ) {
    try {
      const tracksToAdd = await this.spotifyService.addTrackToPlaylist(
        body.accessToken,
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
