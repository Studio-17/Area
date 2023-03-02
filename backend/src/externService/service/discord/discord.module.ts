import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from '././discord.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { DiscordRecord } from './entity/discordRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordCronService } from './discord.cron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscordRecord]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    UserModule,
  ],
  providers: [DiscordService, DiscordCronService],
  controllers: [DiscordController],
  exports: [DiscordService, DiscordCronService],
})
export class DiscordModule {}
