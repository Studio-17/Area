import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  public async getRepository() {}
}
