import { Module } from '@nestjs/common';
import { SpotifyOAuth2Service } from './spotify-oauth2.service';
import { SpotifyOAuth2Controller } from './spotify-oauth2.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    UserModule,
  ],
  providers: [SpotifyOAuth2Service, JwtService],
  controllers: [SpotifyOAuth2Controller],
})
export class SpotifyOAuth2Module {}
