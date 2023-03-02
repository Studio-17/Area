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
import { TwitchModule } from 'src/externService/service/twitch/twitch.module';
import { TimerModule } from 'src/externService/service/timer/timer.module';

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
    forwardRef(() => TwitchModule),
    forwardRef(() => TimerModule),
  ],
  providers: [MyActionService],
  controllers: [MyActionController],
  exports: [MyActionService],
})
export class MyActionModule {}
