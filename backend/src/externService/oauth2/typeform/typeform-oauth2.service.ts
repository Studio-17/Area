import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TypeformOauth2Service {
  constructor(private readonly httpService: HttpService) {}
}
