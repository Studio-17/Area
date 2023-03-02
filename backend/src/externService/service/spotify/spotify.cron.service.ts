import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';
import { Repository } from 'typeorm';
import { SpotifyRecord } from './entity/spotifyRecord.entity';
import { SpotifyService } from './spotify.service';

@Injectable()
export class SpotifyCronService {
  constructor(
    private readonly spotifyService: SpotifyService,
    @InjectRepository(SpotifyRecord)
    private readonly spotifyRecordRepository: Repository<SpotifyRecord>,
  ) {}

  public async findByUserId(userId: string, category: string): Promise<SpotifyRecord> {
    try {
      return await this.spotifyRecordRepository.findOneBy({
        userId: userId,
        category: category,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastRecord(spotifyRecord: SpotifyRecord) {
    const record = await this.findByUserId(spotifyRecord.userId, spotifyRecord.category);
    if (!record) {
      try {
        return { new: false, mail: await this.spotifyRecordRepository.save(spotifyRecord) };
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    if (record.content !== spotifyRecord.content) {
      try {
        const newRecord = await this.spotifyRecordRepository.update(
          {
            userId: record.userId,
            category: record.category,
            content: record.content,
          },
          { ...spotifyRecord },
        );

        if (!newRecord) {
          throw NotFoundException(`Record does not exist`);
        }
        return {
          new: true,
          mail: await this.findByUserId(spotifyRecord.userId, spotifyRecord.category),
        };
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    return { new: false, mail: record };
  }

  async checkTopArtists(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const currentlyPlayingTrack =
        await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(
          actionParam.accessToken,
        );

      const record = new SpotifyRecord();
      record.userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack.item.id;
      return { isTriggered: (await this.findOrUpdateLastRecord(record)).new, returnValues: [] };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  async checkTopTracks(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const currentlyPlayingTrack = await this.spotifyService.getAuthenticatedUserTopTracks(
        actionParam.accessToken,
      );

      const record = new SpotifyRecord();
      record.userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack;
      return { isTriggered: (await this.findOrUpdateLastRecord(record)).new, returnValues: [] };
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

      const record = new SpotifyRecord();
      record.userId = getElemContentInParams(actionParam.params, 'userId', 'undefined');
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack.item.id;
      return {
        isTriggered: (await this.findOrUpdateLastRecord(record)).new,
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
  // ['google/check-mail/', this.googleService.updateLastEmailReceived.bind(this.googleService)],
}
