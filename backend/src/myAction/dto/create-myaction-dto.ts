import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  actionId!: string;

  @IsUUID()
  @IsOptional()
  linkedFromId: string;

  @IsString()
  @IsOptional()
  hour: string;

  @IsString()
  @IsOptional()
  minute: string;

  @IsString()
  @IsOptional()
  second: string;
}
