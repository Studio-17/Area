import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';

@Module({
  providers: [SpotifyService],
  controllers: [SpotifyController]
})
export class SpotifyModule {}
