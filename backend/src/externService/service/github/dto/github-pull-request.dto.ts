import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GithubPullRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  repositoryOwner!: string;

  @IsString()
  @IsNotEmpty()
  repositoryName!: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  pullRequestId!: string;
}
