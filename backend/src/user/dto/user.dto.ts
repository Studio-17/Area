import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  password!: string;
}
