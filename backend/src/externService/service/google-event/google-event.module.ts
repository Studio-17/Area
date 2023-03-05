import { Module } from '@nestjs/common';
import { GoogleEventService } from './google-event.service';
import { GoogleEventController } from '././google-event.controller';
import { CronModule } from 'src/cron/cron.module';
import { HttpModule } from '@nestjs/axios';
import { GoogleEventCronService } from './google-event.cron.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CronModule,
  ],
  providers: [GoogleEventService, GoogleEventCronService],
  controllers: [GoogleEventController],
  exports: [GoogleEventService, GoogleEventCronService],
})
export class GoogleEventModule {}
