import { IsNotEmpty, IsString } from 'class-validator';

export class GithubPullRequestDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

}
