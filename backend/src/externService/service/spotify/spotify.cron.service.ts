import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { SpotifyService } from './spotify.service';

@Injectable()
export class SpotifyCronService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly cronService: CronService,
  ) {}

  async checkTopArtists(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const currentlyPlayingTrack =
        await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(
          actionParam.accessToken,
        );

      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'topArtist',
        currentlyPlayingTrack.item.id,
      );
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  async checkTopTracks(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const currentlyPlayingTrack = await this.spotifyService.getAuthenticatedUserTopTracks(
        actionParam.accessToken,
      );

      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'topTrack',
        currentlyPlayingTrack,
      );
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  async checkCurrentlyPlayingTrack(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const currentlyPlayingTrack =
        await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(
          actionParam.accessToken,
        );

      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'currentlyPlayingTrack',
        currentlyPlayingTrack.item.id,
      );
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [
          { name: 'trackUrl', content: currentlyPlayingTrack.item.external_urls.spotify },
          { name: 'trackName', content: currentlyPlayingTrack.item.name },
          { name: 'trackId', content: currentlyPlayingTrack.item.id },
          { name: 'artistName', content: currentlyPlayingTrack.item.artists[0].name },
        ],
      };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  availableActions = new Map<string, ActionFunction>([
    ['spotify/get-current-playing-track/', this.checkCurrentlyPlayingTrack.bind(this)],
    ['spotify/get-top-artists/', this.checkTopArtists.bind(this)],
    ['spotify/get-top-tracks/', this.checkTopTracks.bind(this)],
  ]);
}
