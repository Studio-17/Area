import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Params } from 'src/cron/type/param.type';

export class CreateMyActionDto {
  @IsUUID()
  @IsNotEmpty()
  actionId!: string;

  @IsUUID()
  @IsOptional()
  linkedFromId: string;

  @IsArray()
  @IsOptional()
  params?: Params;

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
