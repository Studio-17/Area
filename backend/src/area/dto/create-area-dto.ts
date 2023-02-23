import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNotEmpty()
  action!: { id: string; params: { name: string; content: string }[] };

  @IsArray()
  @IsNotEmpty()
  reactions!: { id: string; params: { name: string; content: string }[] }[];

  @IsString()
  @IsOptional()
  hour = '*';

  @IsString()
  @IsOptional()
  minute = '*';

  @IsString()
  @IsOptional()
  second = '*';
}
