import { IsNotEmpty, IsString } from 'class-validator';

export class GithubStarDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
