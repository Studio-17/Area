import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCooniesDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
