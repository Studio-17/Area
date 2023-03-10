import { Module } from '@nestjs/common';
import { GithubOAuth2Service } from './github-oauth2.service';
import { GithubOAuth2Controller } from './github-oauth2.controller';
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
  providers: [GithubOAuth2Service, JwtService],
  controllers: [GithubOAuth2Controller],
})
export class GithubOAuth2Module {}
