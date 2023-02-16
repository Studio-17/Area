import { Module } from '@nestjs/common';
import { GoogleOAuth2Service } from './google-oauth2.service';
import { GoogleOAuth2Controller } from './google-oauth2.controller';
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
  providers: [GoogleOAuth2Service, JwtService],
  controllers: [GoogleOAuth2Controller],
})
export class GoogleOAuth2Module {}
