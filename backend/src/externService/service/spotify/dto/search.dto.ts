import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  q!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;
}
