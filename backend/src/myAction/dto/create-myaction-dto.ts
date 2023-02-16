import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  actionId!: string;

  @IsUUID()
  @IsOptional()
  linkedFromId: string;

  @IsArray()
  @IsOptional()
  params?: { name: string; content: string }[];

  @IsString()
  @IsOptional()
  hour?: string = '*';

  @IsString()
  @IsOptional()
  minute?: string = '*';

  @IsString()
  @IsOptional()
  second?: string = '*';
}
