import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Action, ActionType } from '../action.entity';

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

  @IsEnum({ entity: Action })
  @IsOptional()
  type!: ActionType;
}
