import { Module } from '@nestjs/common';
import { TwitchOAuth2Service } from './twitch-oauth2.service';
import { TwitchOAuth2Controller } from './twitch-oauth2.controller';
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
  providers: [TwitchOAuth2Service],
  controllers: [TwitchOAuth2Controller],
})
export class TwitchOAuth2Module {}
