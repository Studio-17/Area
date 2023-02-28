import { IsNotEmpty, IsString } from 'class-validator';
import { ChannelInformationDto } from './channel-information.dto';

export class ChannelMessageInformationDto extends ChannelInformationDto {
  @IsString()
  @IsNotEmpty()
  message_id!: string;
}
