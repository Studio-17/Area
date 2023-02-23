import { forwardRef, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { ActionModule } from 'src/action/action.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { CronModule } from 'src/cron/cron.module';
import { GoogleCronService } from './google.cron.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([GmailRecord]),
    ScheduleModule.forRoot(),
    CredentialsModule,
    ActionModule,
    UserModule,
    forwardRef(() => CronModule),
    CronModule,
  ],
  providers: [GoogleService, GoogleCronService],
  controllers: [GoogleController],
  exports: [GoogleService, GoogleCronService],
})
export class GoogleModule {}
