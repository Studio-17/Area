import { Injectable } from '@nestjs/common';
import { GoogleFormsService } from './google-forms.service';

@Injectable()
export class GoogleFormsCronService {
  constructor(private readonly googleFormsService: GoogleFormsService) {}
}
