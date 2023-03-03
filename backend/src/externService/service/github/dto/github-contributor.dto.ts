import { IsNotEmpty, IsString } from 'class-validator';

export class GithubContributorDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
