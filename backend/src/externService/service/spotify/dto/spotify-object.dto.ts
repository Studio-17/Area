import { IsNotEmpty, IsString } from 'class-validator';

export class SpotifyObjectDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
