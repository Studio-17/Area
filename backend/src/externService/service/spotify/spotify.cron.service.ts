import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async checkTopArtists(accessToken: string, params: { name: string; content: string }[]) {
    try {
      const currentlyPlayingTrack =
        await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(accessToken);

      const record = new SpotifyRecord();
      record.userId = params.find((param) => param.name === 'userId').content;
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack;
      return (await this.findOrUpdateLastRecord(record)).new;
    } catch (error) {
      console.log('error');
    }
  }

  async checkTopTracks(accessToken: string, params: { name: string; content: string }[]) {
    try {
      const currentlyPlayingTrack = await this.spotifyService.getAuthenticatedUserTopTracks(
        accessToken,
      );

      const record = new SpotifyRecord();
      record.userId = params.find((param) => param.name === 'userId').content;
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack;
      return (await this.findOrUpdateLastRecord(record)).new;
    } catch (error) {
      console.log('error');
    }
  }

  async checkCurrentlyPlayingTrack(
    accessToken: string,
    params: { name: string; content: string }[],
  ) {
    try {
      const currentlyPlayingTrack =
        await this.spotifyService.getAuthenticatedUserCurrentlyPlayingTrack(accessToken);

      const record = new SpotifyRecord();
      record.userId = params.find((param) => param.name === 'userId').content;
      record.category = 'currentlyPlayingTrack';
      record.content = currentlyPlayingTrack;
      return (await this.findOrUpdateLastRecord(record)).new;
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  availableActions = new Map([
    ['spotify/get-current-playing-track/', this.checkCurrentlyPlayingTrack.bind(this)],
    ['spotify/get-top-artists/', this.checkTopArtists.bind(this)],
    ['spotify/get-top-tracks/', this.checkTopTracks.bind(this)],
  ]);
  // ['google/check-mail/', this.googleService.updateLastEmailReceived.bind(this.googleService)],
}
