import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  actionId!: string;

  @IsUUID()
  @IsOptional()
  linkedFromId: string;
}
