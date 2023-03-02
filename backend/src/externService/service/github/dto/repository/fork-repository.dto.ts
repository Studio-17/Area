import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class ForkRepositoryDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  repo: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  default_branch_only: boolean;
}
