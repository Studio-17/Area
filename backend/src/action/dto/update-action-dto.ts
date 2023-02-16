import {IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import { ActionType } from '../entity/action.entity';
import {ServiceType} from "../../service/entity/service.entity";

export class UpdateActionDto {
  @IsString()
  @IsOptional()
  name: string;

  // @IsString()
  // @IsOptional()
  // @IsEnum(ServiceType)
  // serviceName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ActionType)
  @IsOptional()
  type: ActionType;

  @IsArray()
  @IsOptional()
  params: [{ name: string; type: string; description: string }];
}
