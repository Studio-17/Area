import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class ReactionDto {
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsArray()
  @IsOptional()
  params?: { name: string; content: string }[];
}
