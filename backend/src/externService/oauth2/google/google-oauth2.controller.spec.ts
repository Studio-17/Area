import { Test, TestingModule } from '@nestjs/testing';
import { GoogleOAuth2Controller } from './google-oauth2.controller';

describe('ConnectController', () => {
  let controller: GoogleOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleOAuth2Controller],
    }).compile();

    controller = module.get<GoogleOAuth2Controller>(GoogleOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
