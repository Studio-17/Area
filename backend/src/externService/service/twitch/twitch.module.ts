import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { TwitchCronService } from './twitch.cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule.register({}), CredentialsModule, UserModule],
  providers: [TwitchService, TwitchCronService, JwtService],
  controllers: [TwitchController],
  exports: [TwitchService, TwitchCronService],
})
export class TwitchModule {}
