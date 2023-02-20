import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ListRepositoryWorkflowDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;
}
