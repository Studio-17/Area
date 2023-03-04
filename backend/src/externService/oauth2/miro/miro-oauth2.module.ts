import { Module } from '@nestjs/common';
import { MiroOAuth2Service } from './miro-oauth2.service';
import { MiroOAuth2Controller } from './miro-oauth2.controller';
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
  providers: [MiroOAuth2Service, JwtService],
  controllers: [MiroOAuth2Controller],
})
export class MiroOAuth2Module {}
