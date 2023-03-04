import { Module } from '@nestjs/common';
import { DiscordOAuth2Service } from './discord-oauth2.service';
import { DiscordOAuth2Controller } from './discord-oauth2.controller';
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
  providers: [DiscordOAuth2Service, JwtService],
  controllers: [DiscordOAuth2Controller],
})
export class DiscordOAuth2Module {}
