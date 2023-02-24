import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  q!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;
}
