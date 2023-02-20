import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ListRepositoryWorkflowRunsDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  actor!: string;

  @IsString()
  @IsNotEmpty()
  branch!: string;

  @IsString()
  @IsNotEmpty()
  event!: string;

  @IsString()
  @IsNotEmpty()
  status!: string;
}
