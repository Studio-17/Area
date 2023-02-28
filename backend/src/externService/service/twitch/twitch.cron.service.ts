import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';
import { Repository } from 'typeorm';
import { TwitchService } from './twitch.service';

@Injectable()
export class TwitchCronService {
  constructor(private readonly spotifyService: TwitchService) {}
}
