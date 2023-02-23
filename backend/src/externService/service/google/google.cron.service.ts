import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateCronDto } from '../../../cron/dto/add-cron.dto';
import { GoogleService } from './google.service';
import { CronJob } from 'cron';
import { UserService } from 'src/user/user.service';
import { ServiceList } from '../../../service/entity/service.entity';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CronService } from 'src/cron/cron.service';

@Injectable()
export class GoogleCronService {
  constructor(
    private readonly googleService: GoogleService,
    private readonly userService: UserService,
    private readonly credentialsService: CredentialsService,
    private readonly cronService: CronService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async handleCheckMailCron(userId: string, params?: { name: string; content: string }[]) {
    if (!(await this.userService.existByUserId(userId))) {
      console.log('user not found');
      return;
    }

    try {
      const credential = await this.credentialsService.findById(userId, ServiceList.GOOGLE);
      const mail = await this.googleService.updateLastEmailReceived(credential.accessToken, userId);
      if (mail.new) {
        await this.cronService.handleCronReaction(userId, 'google/check-mail/');
      }
    } catch (error: any) {
      console.log('error: ', error);
      return;
    }
  }

  availableActions = new Map([['google/check-mail/', this.handleCheckMailCron.bind(this)]]);

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
