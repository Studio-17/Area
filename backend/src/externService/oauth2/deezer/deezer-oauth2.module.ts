import { Module } from '@nestjs/common';
import { DeezerOauth2Service } from './deezer-oauth2.service';
import { DeezerOauth2Controller } from './deezer-oauth2.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialsModule } from '../../../credentials/credentials.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
  ],
  providers: [DeezerOauth2Service, JwtService],
  controllers: [DeezerOauth2Controller],
})
export class DeezerOAuth2Module {}
