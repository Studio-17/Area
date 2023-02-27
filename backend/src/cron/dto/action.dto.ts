import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class ActionDto {
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsArray()
  @IsOptional()
  params?: { name: string; content: string }[];
}
