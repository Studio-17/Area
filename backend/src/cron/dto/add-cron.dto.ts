import { IsNotEmpty, IsString, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ServiceList } from 'src/service/entity/service.entity';
import { Params } from '../cron.type';

export class CreateCronDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  link!: string;

  @IsNotEmpty()
  service!: ServiceList;

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
  params?: Params;
}
