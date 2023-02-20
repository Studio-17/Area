import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ListRepositoryCollaboratorDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  affiliation!: string;

  @IsString()
  @IsOptional()
  permission?: string;
}
