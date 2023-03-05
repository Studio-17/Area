import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { CronModule } from 'src/cron/cron.module';
import { GithubCronService } from './github.cron.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ScheduleModule.forRoot(),
    CronModule,
  ],
  providers: [GithubService, GithubCronService],
  controllers: [GithubController],
  exports: [GithubService, GithubCronService],
})
export class GithubModule {}
