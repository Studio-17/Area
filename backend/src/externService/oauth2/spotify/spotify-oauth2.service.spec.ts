import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyOAuth2Service } from './spotify-oauth2.service';

describe('GoogleOAuth2Service', () => {
  let service: SpotifyOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyOAuth2Service],
    }).compile();

    service = module.get<SpotifyOAuth2Service>(SpotifyOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
