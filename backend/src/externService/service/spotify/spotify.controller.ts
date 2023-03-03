import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ReactionDto } from 'src/cron/dto/reaction.dto';

@Controller('actions/spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

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

  @Post('/follow-playlist')
  public async followPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.followPlaylist(body);

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

  @Post('/unfollow-playlist')
  public async unfollowPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.unfollowPlaylist(body);

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

  @Post('/add-track-to-queue')
  public async addTrackToQueue(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.addTrackToQueue(body);

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

  @Post('/create-playlist')
  public async createPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const searchResult = await this.spotifyService.createPlaylist(body);

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

  @Post('/add-track-to-playlist')
  public async addTrackToPlaylist(@Res() response, @Body() body: ReactionDto) {
    try {
      const tracksToAdd = await this.spotifyService.addTrackToPlaylist(body);

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
