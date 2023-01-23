import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAreaDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
