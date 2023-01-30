import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
