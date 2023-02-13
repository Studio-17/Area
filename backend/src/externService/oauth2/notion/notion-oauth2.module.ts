import { Module } from '@nestjs/common';
import { NotionOAuth2Service } from './notion-oauth2.service';
import { NotionOAuth2Controller } from './notion-oauth2.controller';
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
  providers: [NotionOAuth2Service],
  controllers: [NotionOAuth2Controller],
})
export class NotionOAuth2Module {}
