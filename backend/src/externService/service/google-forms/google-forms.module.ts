import { forwardRef, Module } from '@nestjs/common';
import { GoogleFormsService } from './google-forms.service';
import { GoogleFormsController } from './google-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronModule } from 'src/cron/cron.module';
import { GoogleFormsCronService } from './google-forms.cron.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GoogleFormsService],
  controllers: [GoogleFormsController],
  exports: [GoogleFormsService],
})
export class GoogleFormsModule {}
