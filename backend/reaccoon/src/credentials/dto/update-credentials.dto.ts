import { PartialType, PickType } from '@nestjs/swagger';
import { CredentialsDto } from './credentials.dto';

export class UpdateCredentialsDto extends PartialType(
  PickType(CredentialsDto, ['accessToken', 'refreshToken'] as const),
) {}
