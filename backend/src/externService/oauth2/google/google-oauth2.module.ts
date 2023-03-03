import { Module } from '@nestjs/common';
import { GoogleOAuth2Service } from './google-oauth2.service';
import { GoogleOAuth2Controller } from './google-oauth2.controller';
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
  providers: [GoogleOAuth2Service, JwtService],
  controllers: [GoogleOAuth2Controller],
})
export class GoogleOAuth2Module {}
