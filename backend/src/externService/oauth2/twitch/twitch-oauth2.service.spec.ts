import { Test, TestingModule } from '@nestjs/testing';
import { TwitchOAuth2Service } from './twitch-oauth2.service';

describe('GithubService', () => {
  let service: TwitchOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitchOAuth2Service],
    }).compile();

    service = module.get<TwitchOAuth2Service>(TwitchOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
