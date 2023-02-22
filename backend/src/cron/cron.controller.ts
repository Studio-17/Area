import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cron')
@Controller('cron')
export class CronController {}
