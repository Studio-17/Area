import { IsNotEmpty, IsString } from 'class-validator';

export class ChannelInformationDto {
  @IsString()
  @IsNotEmpty()
  guild_channel_id!: string;

  @IsString()
  @IsNotEmpty()
  bot_token!: string;
}
