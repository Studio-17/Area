import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from '././discord.controller';
import { HttpModule } from '@nestjs/axios';
import { DiscordCronService } from './discord.cron.service';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CronModule,
  ],
  providers: [DiscordService, DiscordCronService],
  controllers: [DiscordController],
  exports: [DiscordService, DiscordCronService],
})
export class DiscordModule {}
