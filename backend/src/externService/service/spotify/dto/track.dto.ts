import { IsNotEmpty, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  uri!: string;
}
