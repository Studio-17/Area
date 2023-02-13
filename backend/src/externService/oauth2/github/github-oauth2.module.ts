import { Module } from '@nestjs/common';
import { GithubOAuth2Service } from './github-oauth2.service';
import { GithubOAuth2Controller } from './github-oauth2.controller';
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
  providers: [GithubOAuth2Service],
  controllers: [GithubOAuth2Controller],
})
export class GithubOAuth2Module {}
