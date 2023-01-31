import { IsNotEmpty, IsString } from 'class-validator';

export class GmailRecordDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  lastEmailId!: string;
}
