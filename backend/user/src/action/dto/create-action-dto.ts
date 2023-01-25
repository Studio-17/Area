import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
