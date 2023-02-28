import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from '././discord.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    UserModule,
  ],
  providers: [DiscordService, JwtService],
  controllers: [DiscordController],
  exports: [DiscordService],
})
export class DiscordModule {}
