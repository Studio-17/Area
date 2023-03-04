import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { Params } from '../type/param.type';
import { ReturnValues } from '../type/returnValue.type';

export class ReactionDto {
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsArray()
  @IsOptional()
  params?: Params;

  @IsArray()
  @IsOptional()
  returnValues?: ReturnValues;
}
