import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsArray()
  @IsNotEmpty()
  reactions!: string[];
}
