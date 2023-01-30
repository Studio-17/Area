import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsArray()
  @IsNotEmpty()
  reactions!: string[];
}
