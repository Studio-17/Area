import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateActionDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  serviceId: string;

  @IsString()
  @IsOptional()
  description: string;
}
