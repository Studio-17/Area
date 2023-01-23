import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCooniesDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
