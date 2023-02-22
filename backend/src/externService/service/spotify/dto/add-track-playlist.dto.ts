import { IsNotEmpty, IsString } from 'class-validator';
import { TrackDto } from './track.dto';

export class AddTrackPlaylistDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  uri!: string;
}
