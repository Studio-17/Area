import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ControlRepositoryWorkflowDto {
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
