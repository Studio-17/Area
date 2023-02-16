import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ActionType } from '../entity/action.entity';
import {ServiceList} from "../../service/entity/service.entity";

export class UpdateActionDto {
  @IsString()
  @IsOptional()
  name: string;

  // @IsString()
  // @IsOptional()
  // @IsEnum(ServiceList)
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
