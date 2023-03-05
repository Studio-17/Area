import { IsNotEmpty, IsString } from 'class-validator';

export class GithubUnstarRepositoryDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
