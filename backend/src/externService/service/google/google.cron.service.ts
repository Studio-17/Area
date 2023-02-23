import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateCronDto } from '../../../cron/dto/add-cron.dto';
import { GoogleService } from './google.service';
import { CronJob } from 'cron';

@Injectable()
export class GoogleCronService {
  constructor(
    private readonly googleService: GoogleService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  availableActions = new Map([
    ['google/check-mail/', this.googleService.handleCron.bind(this.googleService)],
  ]);

  addGoogleCron(body: CreateCronDto) {
    if (!this.availableActions.has(body.link)) {
      console.log('No such function');
      return;
    }

    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.availableActions.get(body.link).bind(this, body.userId, body.params),
    );
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }
}
