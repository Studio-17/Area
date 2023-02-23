import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Injectable()
export class SpotifyCronService {
  constructor(private readonly spotifyService: SpotifyService) {}

  availableActions = new Map([]);
}
