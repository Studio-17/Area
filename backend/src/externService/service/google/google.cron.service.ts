import { Injectable } from '@nestjs/common';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleCronService {
  constructor(private readonly googleService: GoogleService) {}

  availableActions = new Map([
    ['google/check-mail/', this.googleService.updateLastEmailReceived.bind(this.googleService)],
  ]);
}
