import { IsNotEmpty, IsString } from 'class-validator';

export class GithubInvitationDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
