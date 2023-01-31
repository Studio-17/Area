import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ActionType } from '../action.entity';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(ActionType)
  @IsNotEmpty()
  type!: ActionType;
}
