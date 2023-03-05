import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookCronService } from './webhook.cron.service';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CronModule,
  ],
  providers: [WebhookService, WebhookCronService],
  controllers: [WebhookController],
  exports: [WebhookService, WebhookCronService],
})
export class WebhookModule {}
