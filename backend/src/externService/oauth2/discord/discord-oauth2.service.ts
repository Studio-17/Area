import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DiscordOAuth2Service {
  constructor(private readonly httpService: HttpService) {}
}