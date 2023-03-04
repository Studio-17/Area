import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { HttpModule } from '@nestjs/axios';
import { SpotifyCronService } from './spotify.cron.service';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [HttpModule.register({}), CronModule],
  providers: [SpotifyService, SpotifyCronService],
  controllers: [SpotifyController],
  exports: [SpotifyService, SpotifyCronService],
})
export class SpotifyModule {}
