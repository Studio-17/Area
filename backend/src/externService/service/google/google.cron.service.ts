import { Injectable } from '@nestjs/common';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleCronService {
  constructor(private readonly googleService: GoogleService) {}

  googleMailAvailableActions = new Map<string, ActionFunction>([
    ['google/check-mail/', this.googleService.updateLastEmailReceived.bind(this.googleService)],
  ]);
}
