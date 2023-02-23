import { forwardRef, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronModule } from 'src/cron/cron.module';
import { GoogleCronService } from './google.cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([GmailRecord]), forwardRef(() => CronModule), CronModule],
  providers: [GoogleService, GoogleCronService],
  controllers: [GoogleController],
  exports: [GoogleService, GoogleCronService],
})
export class GoogleModule {}
