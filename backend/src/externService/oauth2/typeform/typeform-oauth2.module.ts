import { Module } from '@nestjs/common';
import { TypeformOauth2Service } from './typeform-oauth2.service';
import { TypeformOauth2Controller } from './typeform-oauth2.controller';
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
  providers: [TypeformOauth2Service, JwtService],
  controllers: [TypeformOauth2Controller],
})
export class TypeformOAuth2Module {}
