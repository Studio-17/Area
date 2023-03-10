import { IsNotEmpty, IsString } from 'class-validator';

export class GithubIssueDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
