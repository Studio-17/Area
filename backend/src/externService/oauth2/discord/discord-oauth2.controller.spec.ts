import { Test, TestingModule } from '@nestjs/testing';
import { DiscordOAuth2Controller } from './discord-oauth2.controller';

describe('GithubController', () => {
  let controller: DiscordOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscordOAuth2Controller],
    }).compile();

    controller = module.get<DiscordOAuth2Controller>(DiscordOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
