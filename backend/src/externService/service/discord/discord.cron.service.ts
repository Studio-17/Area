import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordRecord } from './entity/discordRecord.entity';
import { DiscordService } from './discord.service';
import { Params } from 'src/cron/cron.type';

@Injectable()
export class DiscordCronService {
  constructor(
    private readonly discordService: DiscordService,
    @InjectRepository(DiscordRecord)
    private readonly discordRecordRepository: Repository<DiscordRecord>,
  ) {}

  checkNewScheduledEvents(accessToken: string, params: Params) {
    // try {
    //   const userInfo = this.discordService.getAuthenticatedUserInformation(accessToken);
    //   console.log(userInfo);

    //   // this.discordService.getGuildScheduledEvents()
    //   // this.discordService.getGuildScheduledEventsById()
    // } catch (error) {
    //   throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    // }
  }

  availableActions = new Map([
    ['discord/get/guild/scheduled-events/', this.checkNewScheduledEvents.bind(this)],
  ]);
}
