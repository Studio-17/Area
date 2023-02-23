import { Injectable } from '@nestjs/common';
import { CreateCronDto } from '../../../cron/dto/add-cron.dto';
import { SpotifyService } from './spotify.service';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SpotifyCronService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // availableActions = new Map([
  // ]);

  addSpotifyCron(body: CreateCronDto) {
  //   if (!this.availableActions.has(body.link)) {
  //     console.log('No such function');
  //     return;
  //   }

  //   const job = new CronJob(
  //     body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
  //     this.availableActions.get(body.link).bind(this, body.userId, body.params),
  //   );
  //   this.schedulerRegistry.addCronJob(body.name, job);
  //   job.start();
  }
}
