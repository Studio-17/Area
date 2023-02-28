import { IsNotEmpty, IsString } from 'class-validator';

export class GuildInformationDto {
  @IsString()
  @IsNotEmpty()
  guild_id!: string;

  @IsString()
  @IsNotEmpty()
  bot_token!: string;
}
