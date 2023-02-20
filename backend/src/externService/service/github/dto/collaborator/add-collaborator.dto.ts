import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddCollaboratorDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsOptional()
  permission?: string;
}
