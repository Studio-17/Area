import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { CronModule } from 'src/cron/cron.module';
import { UserModule } from 'src/user/user.module';
import { DeezerController } from './deezer.controller';
import { DeezerCronService } from './deezer.cron.service';
import { DeezerService } from './deezer.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), HttpModule.register({}), CredentialsModule, CronModule],
  providers: [DeezerService, DeezerCronService],
  controllers: [DeezerController],
  exports: [DeezerService, DeezerCronService],
})
export class DeezerModule {}
