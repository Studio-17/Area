import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';
import { HttpModule } from '@nestjs/axios';
import { TwitchCronService } from './twitch.cron.service';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [HttpModule.register({}), CronModule],
  providers: [TwitchService, TwitchCronService],
  controllers: [TwitchController],
  exports: [TwitchService, TwitchCronService],
})
export class TwitchModule {}
