import { IsNotEmpty, IsString } from 'class-validator';

export class GithubCheckStarDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
