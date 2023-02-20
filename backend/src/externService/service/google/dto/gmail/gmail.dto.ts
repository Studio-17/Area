import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class GmailRecordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  lastEmailId!: string;
}
