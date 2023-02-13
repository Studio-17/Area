import { Test, TestingModule } from '@nestjs/testing';
import { TwitchOAuth2Controller } from './twitch-oauth2.controller';

describe('GithubController', () => {
  let controller: TwitchOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitchOAuth2Controller],
    }).compile();

    controller = module.get<TwitchOAuth2Controller>(TwitchOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
