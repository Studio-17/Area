import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ActionType } from '../entity/action.entity';
import {ServiceType} from "../../service/entity/service.entity";

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsEnum(ServiceType)
  // serviceName!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  link!: string;

  @IsEnum(ActionType)
  @IsNotEmpty()
  type!: ActionType;

  @IsArray()
  @IsOptional()
  params: [{ name: string; type: string; description: string }];
}
