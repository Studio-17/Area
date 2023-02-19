import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GithubIssueDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  repositoryOwner: string;

  @IsString()
  @IsNotEmpty()
  repositoryName: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  issueId: string;
}
