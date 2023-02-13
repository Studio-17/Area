import { Test, TestingModule } from '@nestjs/testing';
import { MiroOAuth2Controller } from './miro-oauth2.controller';

describe('ConnectController', () => {
  let controller: MiroOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiroOAuth2Controller],
    }).compile();

    controller = module.get<MiroOAuth2Controller>(MiroOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
