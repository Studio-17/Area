import { IsNotEmpty, IsString } from 'class-validator';

export class GithubForkDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
