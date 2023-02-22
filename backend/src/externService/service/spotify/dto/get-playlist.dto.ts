import { IsNotEmpty, IsString } from 'class-validator';

export class GetPlaylistDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
