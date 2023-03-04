import { IsNotEmpty, IsString } from 'class-validator';

export class GithubStarRepositoryDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
