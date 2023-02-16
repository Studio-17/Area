import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ActionType } from '../action.entity';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

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
  params: { name: string; type: string; description: string }[];
}
