import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { ActionModule } from 'src/action/action.module';
import { MyActionModule } from 'src/myAction/myAction.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule.register({}), CredentialsModule, UserModule],
  providers: [SpotifyService, JwtService],
  controllers: [SpotifyController],
  exports: [SpotifyService],
})
export class SpotifyModule {}
