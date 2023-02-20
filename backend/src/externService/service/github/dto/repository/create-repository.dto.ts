import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  homepage?: string;

  @IsString()
  @IsOptional()
  private?: string;

  @IsString()
  @IsOptional()
  auto_init?: string;

  @IsString()
  @IsOptional()
  gitignore_template?: string;
}
