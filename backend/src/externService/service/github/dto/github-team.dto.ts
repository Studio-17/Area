import { IsNotEmpty, IsString } from 'class-validator';

export class GithubTeamDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
