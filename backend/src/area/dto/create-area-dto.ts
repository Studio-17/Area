import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsArray()
  @IsOptional()
  actionParams?: { name: string; content: string }[];

  @IsArray()
  @IsNotEmpty()
  reactions!: string[];

  @IsArray()
  @IsOptional()
  reactionsParams?: [{ name: string; content: string }[]];

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
