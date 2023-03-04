import { Injectable } from '@nestjs/common';
import { GoogleEventService } from './google-event.service';

@Injectable()
export class GoogleEventCronService {
  constructor(private readonly googleEventService: GoogleEventService) {}
}
