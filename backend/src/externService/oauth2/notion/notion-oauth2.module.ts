import { Module } from '@nestjs/common';
import { NotionOAuth2Service } from './notion-oauth2.service';
import { NotionOAuth2Controller } from './notion-oauth2.controller';
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
  providers: [NotionOAuth2Service, JwtService],
  controllers: [NotionOAuth2Controller],
})
export class NotionOAuth2Module {}
