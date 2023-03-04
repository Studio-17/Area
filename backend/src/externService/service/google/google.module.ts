import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { CronModule } from 'src/cron/cron.module';
import { GoogleCronService } from './google.cron.service';

@Module({
  imports: [CronModule],
  providers: [GoogleService, GoogleCronService],
  controllers: [GoogleController],
  exports: [GoogleService, GoogleCronService],
})
export class GoogleModule {}
