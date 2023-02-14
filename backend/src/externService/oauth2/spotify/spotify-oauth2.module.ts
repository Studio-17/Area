import { Module } from '@nestjs/common';
import { SpotifyOAuth2Service } from './spotify-oauth2.service';
import { SpotifyOAuth2Controller } from './spotify-oauth2.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialsModule } from '../../../credentials/credentials.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
  ],
  providers: [SpotifyOAuth2Service],
  controllers: [SpotifyOAuth2Controller],
})
export class SpotifyOAuth2Module {}
