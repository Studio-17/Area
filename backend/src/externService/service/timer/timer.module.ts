import { Module } from '@nestjs/common';
import { TimerCronService } from './timer.cron.service';

@Module({
  imports: [],
  providers: [TimerCronService],
  exports: [TimerCronService],
})
export class TimerModule {}
