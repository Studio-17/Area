import { IsNotEmpty, IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateCronDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  link!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsOptional()
  second?: string = '*';

  @IsString()
  @IsOptional()
  minute?: string = '*';

  @IsString()
  @IsOptional()
  hour?: string = '*';

  @IsArray()
  @IsOptional()
  params?: [{ name: string; content: string }];
}
