import { forwardRef, Module } from '@nestjs/common';
import { GoogleEventService } from './google-event.service';
import { GoogleEventController } from '././google-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronModule } from 'src/cron/cron.module';
import { GoogleEventCronService } from './google-event.cron.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GoogleEventService],
  controllers: [GoogleEventController],
  exports: [GoogleEventService],
})
export class GoogleEventModule {}
