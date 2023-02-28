import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { SpotifyCronService } from './spotify.cron.service';
import { SpotifyRecord } from './entity/spotifyRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpotifyRecord]),
    HttpModule.register({}),
    CredentialsModule,
    UserModule,
  ],
  providers: [SpotifyService, SpotifyCronService],
  controllers: [SpotifyController],
  exports: [SpotifyService, SpotifyCronService],
})
export class SpotifyModule {}
