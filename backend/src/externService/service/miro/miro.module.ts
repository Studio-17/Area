import { Module } from '@nestjs/common';
import { MiroService } from './miro.service';
import { MiroController } from './miro.controller';
import { HttpModule } from '@nestjs/axios';
import { MiroCronService } from './miro.cron.service';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [HttpModule.register({}), CronModule],
  providers: [MiroService, MiroCronService],
  controllers: [MiroController],
  exports: [MiroService, MiroCronService],
})
export class MiroModule {}
