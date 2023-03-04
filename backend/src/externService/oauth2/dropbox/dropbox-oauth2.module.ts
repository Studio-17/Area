import { Module } from '@nestjs/common';
import { DropboxOauth2Service } from './dropbox-oauth2.service';
import { DropboxOauth2Controller } from './dropbox-oauth2.controller';
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
  providers: [DropboxOauth2Service, JwtService],
  controllers: [DropboxOauth2Controller],
})
export class DropboxOAuth2Module {}
