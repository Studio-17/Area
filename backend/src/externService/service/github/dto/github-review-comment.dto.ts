import { IsNotEmpty, IsString } from 'class-validator';

export class GithubReviewCommentDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
