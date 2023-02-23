import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ReRunWorkflowDto {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsString()
  @IsNotEmpty()
  runId!: string;

  @IsString()
  @IsNotEmpty()
  enableDebugLogging!: boolean;
}
