import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { Params } from '../cron.type';

export class ReactionDto {
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsArray()
  @IsOptional()
  params?: Params;
}
