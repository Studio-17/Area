import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GithubPullRequestDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsNumberString()
  // pullRequestId!: string;
}
