import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from 'src/action/action.module';
import { AreaModule } from 'src/area/area.module';
import { GoogleModule } from 'src/externService/service/google/google.module';
import { MyActionController } from './myAction.controller';
import { MyActionEntity } from './entity/myAction.entity';
import { MyActionService } from './myAction.service';
import { GithubModule } from '../externService/service/github/github.module';
import { SpotifyModule } from 'src/externService/service/spotify/spotify.module';
import { CronModule } from 'src/cron/cron.module';
import { DiscordModule } from 'src/externService/service/discord/discord.module';
import { TwitchModule } from 'src/externService/service/twitch/twitch.module';
import { TimerModule } from 'src/externService/service/timer/timer.module';
import { MiroModule } from 'src/externService/service/miro/miro.module';
import { DeezerModule } from 'src/externService/service/deezer/deezer.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([MyActionEntity]),
    ActionModule,
    forwardRef(() => AreaModule),
    forwardRef(() => CronModule),
    forwardRef(() => GoogleModule),
    forwardRef(() => GithubModule),
    forwardRef(() => SpotifyModule),
    forwardRef(() => DiscordModule),
    forwardRef(() => TwitchModule),
    forwardRef(() => TimerModule),
    forwardRef(() => MiroModule),
    forwardRef(() => DeezerModule),
  ],
  providers: [MyActionService],
  controllers: [MyActionController],
  exports: [MyActionService],
})
export class MyActionModule {}
