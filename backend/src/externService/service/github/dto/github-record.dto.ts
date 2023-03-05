import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GithubRecordDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  id!: string;
}
