import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from 'src/action/action.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { MyActionModule } from 'src/myAction/myAction.module';
import { ServiceModule } from 'src/service/service.module';
import { UserModule } from 'src/user/user.module';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { ActionRecord } from './entity/actionRecord.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    TypeOrmModule.forFeature([ActionRecord]),
    forwardRef(() => MyActionModule),
    ActionModule,
    UserModule,
    ServiceModule,
  ],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
