import { IsNotEmpty, IsString } from 'class-validator';
import { GuildInformationDto } from './guild-information.dto';

export class ScheduledEventInformationByIdDto extends GuildInformationDto {
  @IsNotEmpty()
  @IsString()
  scheduled_event_id!: string;
}
