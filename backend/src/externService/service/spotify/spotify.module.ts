import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { SpotifyCronService } from './spotify.cron.service';

@Module({
  imports: [HttpModule.register({}), CredentialsModule, UserModule],
  providers: [SpotifyService, SpotifyCronService, JwtService],
  controllers: [SpotifyController],
  exports: [SpotifyService, SpotifyCronService],
})
export class SpotifyModule {}
