import { IsNotEmpty, IsString } from 'class-validator';

export class GithubMilestoneDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
