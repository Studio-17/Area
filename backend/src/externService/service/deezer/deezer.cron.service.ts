import { Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { DeezerService } from './deezer.service';

@Injectable()
export class DeezerCronService {
  constructor(
    private readonly deezerService: DeezerService,
    private readonly cronService: CronService,
  ) {}
  async CreatedANewPlaylist(actionParam: ActionParam): Promise<ActionResult> {
    const playlists = await this.deezerService.getPlaylists(actionParam.accessToken);
    const pastReccord = await this.cronService.findByActionId(
      actionParam.myActionId,
      'numberOfCreatedPlaylists',
    );
    const length = playlists.data.length;
    const record = this.cronService.createRecord(
      actionParam.myActionId,
      'numberOfCreatedPlaylists',
      length,
    );
    console.log('Check deezer');
    const res = await this.cronService.findOrUpdateLastRecord(record);
    if (res && +pastReccord.content < +length) {
      return {
        isTriggered: true,
        returnValues: [{ name: 'playlistName', content: playlists.data[length - 1].title }],
      };
    }
    return { isTriggered: false };
  }

  async DeletedANewPlaylist(actionParam: ActionParam): Promise<ActionResult> {
    const playlists = await this.deezerService.getPlaylists(actionParam.accessToken);
    const pastReccord = await this.cronService.findByActionId(
      actionParam.myActionId,
      'numberOfCreatedPlaylists',
    );
    const length = playlists.data.length;
    const record = this.cronService.createRecord(
      actionParam.myActionId,
      'numberOfCreatedPlaylists',
      length,
    );
    console.log('Check deezer');
    const res = await this.cronService.findOrUpdateLastRecord(record);
    if (res && +pastReccord.content > +length) {
      return {
        isTriggered: true,
        returnValues: [{ name: 'playlistName', content: playlists.data[length - 1].title }],
      };
    }
    return { isTriggered: false };
  }

  public availableActions = new Map<string, ActionFunction>([
    ['deezer/new-created-playlist/', this.CreatedANewPlaylist.bind(this)],
    ['deezer/deleted-playlist/', this.DeletedANewPlaylist.bind(this)],
  ]);
}
