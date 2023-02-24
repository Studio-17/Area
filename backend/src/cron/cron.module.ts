import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ActionModule } from 'src/action/action.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { MyActionModule } from 'src/myAction/myAction.module';
import { UserModule } from 'src/user/user.module';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    forwardRef(() => MyActionModule),
    ActionModule,
    UserModule,
  ],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
