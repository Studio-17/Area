import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCronDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  second?: string = '*';

  @IsString()
  @IsOptional()
  minute?: string = '*';

  @IsString()
  @IsOptional()
  hour?: string = '*';
}
