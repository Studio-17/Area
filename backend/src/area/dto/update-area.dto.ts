import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAreaDto } from './create-area.dto';

export class UpdateAreaDto extends PickType(CreateAreaDto, [
  'name',
  'color',
  'action',
  'reactions',
  'hour',
  'minute',
  'second',
] as const) {}
