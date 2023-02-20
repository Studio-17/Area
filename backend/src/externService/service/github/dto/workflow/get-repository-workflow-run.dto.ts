import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class GetRepositoryWorkflowRunDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  workflowId!: string;
}
