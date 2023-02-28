import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeBotDto {
  @IsString()
  @IsNotEmpty()
  guild_id!: string;
}
