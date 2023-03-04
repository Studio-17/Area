import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Params } from 'src/cron/type/param.type';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNotEmpty()
  action!: { id: string; params: Params };

  @IsArray()
  @IsNotEmpty()
  reactions!: { id: string; params: Params }[];

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
