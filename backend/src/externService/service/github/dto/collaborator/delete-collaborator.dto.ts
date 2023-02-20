import { OmitType, PickType } from '@nestjs/swagger';
import { AddCollaboratorDto } from './add-collaborator.dto';

export class DeleteCollaboratorDto extends OmitType(AddCollaboratorDto, ['permission'] as const) {}
