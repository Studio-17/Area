import { Test, TestingModule } from '@nestjs/testing';
import { DiscordOAuth2Service } from './discord-oauth2.service';

describe('GithubService', () => {
  let service: DiscordOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordOAuth2Service],
    }).compile();

    service = module.get<DiscordOAuth2Service>(DiscordOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
