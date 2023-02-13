import { Test, TestingModule } from '@nestjs/testing';
import { GithubOAuth2Service } from './github-oauth2.service';

describe('GithubService', () => {
  let service: GithubOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubOAuth2Service],
    }).compile();

    service = module.get<GithubOAuth2Service>(GithubOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
