import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GithubIssueDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsNumberString()
  // issueId: string;
}
