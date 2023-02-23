import { Injectable } from '@nestjs/common';
import { CreateCronDto } from '../../../cron/dto/add-cron.dto';
import { GithubService } from './github.service';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CronService } from 'src/cron/cron.service';
import { ServiceList } from '../../../service/entity/service.entity';

@Injectable()
export class GithubCronService {
  constructor(
    private readonly githubService: GithubService,
    private readonly userService: UserService,
    private readonly credentialsService: CredentialsService,
    private readonly cronService: CronService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async handleCheckPullRequestCron(userId: string, params?: { name: string; content: string }[]) {
    if (!(await this.userService.existByUserId(userId))) {
      return;
    }

    try {
      const credential = await this.credentialsService.findById(userId, ServiceList.GOOGLE);
      const pullRequest = await this.githubService.updateLastPullRequest(
        credential.accessToken,
        params[0].content,
        params[1].content,
      );
      if (pullRequest.new) {
        await this.cronService.handleCronReaction(userId, 'github/check-pull-request/');
      }
    } catch (error: any) {
      return;
    }
  }

  async handleCheckIssueCron(userId: string, params?: { name: string; content: string }[]) {
    if (!(await this.userService.existByUserId(userId))) {
      return;
    }

    try {
      const credential = await this.credentialsService.findById(userId, ServiceList.GOOGLE);
      const issue = await this.githubService.updateLastIssue(
        credential.accessToken,
        params[0].content,
        params[1].content,
      );
      if (issue.new) {
        await this.cronService.handleCronReaction(userId, 'github/check-issue/');
      }
    } catch (error: any) {
      return;
    }
  }

  availableActions = new Map([
    ['github/check-pull-request/', this.handleCheckPullRequestCron.bind(this.githubService)],
    ['github/check-issue/', this.handleCheckIssueCron.bind(this.githubService)],
    // ['github/get-repository/', this.githubService.addRepositoryCron.bind(this.githubService)],
  ]);

  addGithubCron(body: CreateCronDto) {
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
