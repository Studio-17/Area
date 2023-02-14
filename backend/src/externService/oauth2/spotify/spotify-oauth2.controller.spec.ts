import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyOAuth2Controller } from './spotify-oauth2.controller';

describe('ConnectController', () => {
  let controller: SpotifyOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyOAuth2Controller],
    }).compile();

    controller = module.get<SpotifyOAuth2Controller>(SpotifyOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
