import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateSchedulesEventDto {
  @IsString()
  @IsOptional()
  channel_id?: string; // voice channel

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  @IsNumberString()
  privacy_level?: string = '2';

  @IsString()
  @IsNotEmpty()
  scheduled_start_time!: string; // ISO 8601 timestamp

  @IsString()
  @IsNotEmpty()
  scheduled_end_time!: string; // ISO 8601 timestamp

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsOptional()
  @IsNumberString()
  entity_type?: string = '2';
}
