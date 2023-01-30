import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  areaId!: string;

  @IsUUID()
  @IsNotEmpty()
  actionId!: string;

  @IsUUID()
  @IsOptional()
  linkedFromId: string;
}
