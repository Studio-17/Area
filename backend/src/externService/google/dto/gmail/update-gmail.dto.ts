import { PartialType, PickType } from '@nestjs/swagger';
import { GmailRecordDto } from './gmail.dto';

export class UpdateGmailRecordDto extends PartialType(
  PickType(GmailRecordDto, ['lastEmailId'] as const),
) {}
