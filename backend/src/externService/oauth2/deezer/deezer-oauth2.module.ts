import { Module } from '@nestjs/common';
import { DeezerOauth2Service } from './deezer-oauth2.service';
import { DeezerOauth2Controller } from './deezer-oauth2.controller';
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
  providers: [DeezerOauth2Service, JwtService],
  controllers: [DeezerOauth2Controller],
})
export class DeezerOAuth2Module {}
