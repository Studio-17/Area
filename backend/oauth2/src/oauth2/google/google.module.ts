import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleOAuth2Strategy } from './strategies/google.strategy';

@Module({
  providers: [GoogleService, GoogleOAuth2Strategy],
  controllers: [GoogleController],
})
export class GoogleOAuth2Module {}
