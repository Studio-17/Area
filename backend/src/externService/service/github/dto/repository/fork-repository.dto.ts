import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ForkRepositoryDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  repo: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  default_branch_only: boolean;
}
