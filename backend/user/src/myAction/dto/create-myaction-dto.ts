import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  areaId!: string;

  @IsUUID()
  @IsNotEmpty()
  actionId!: string;
}
