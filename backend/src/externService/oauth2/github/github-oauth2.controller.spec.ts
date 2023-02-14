import { Test, TestingModule } from '@nestjs/testing';
import { GithubOAuth2Controller } from './github-oauth2.controller';

describe('GithubController', () => {
  let controller: GithubOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubOAuth2Controller],
    }).compile();

    controller = module.get<GithubOAuth2Controller>(GithubOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
