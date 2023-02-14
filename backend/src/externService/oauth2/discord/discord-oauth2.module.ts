import { Module } from '@nestjs/common';
import { DiscordOAuth2Service } from './discord-oauth2.service';
import { DiscordOAuth2Controller } from './discord-oauth2.controller';
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
  providers: [DiscordOAuth2Service],
  controllers: [DiscordOAuth2Controller],
})
export class DiscordOAuth2Module {}
