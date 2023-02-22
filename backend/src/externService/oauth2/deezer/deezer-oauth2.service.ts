import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DeezerOauth2Service {
  constructor(private readonly httpService: HttpService) {}
}
