import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionRecord } from 'src/cron/entity/actionRecord.entity';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { MiroService } from './miro.service';

@Injectable()
export class MiroCronService {
  constructor() {}
}
