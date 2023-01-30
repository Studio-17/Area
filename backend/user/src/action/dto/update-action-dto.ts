import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ActionType } from '../action.entity';

export class UpdateActionDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  serviceId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ActionType)
  @IsOptional()
  type: ActionType;
}
