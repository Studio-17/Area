import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DropboxOauth2Service {
  constructor(private readonly httpService: HttpService) {}
}
