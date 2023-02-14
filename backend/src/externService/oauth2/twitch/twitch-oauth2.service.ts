import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TwitchOAuth2Service {
  constructor(private readonly httpService: HttpService) {}
}
