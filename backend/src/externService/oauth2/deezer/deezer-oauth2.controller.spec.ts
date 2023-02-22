import { Test, TestingModule } from '@nestjs/testing';
import { DeezerOauth2Controller } from './deezer-oauth2.controller';

describe('DeezerController', () => {
  let controller: DeezerOauth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeezerOauth2Controller],
    }).compile();

    controller = module.get<DeezerOauth2Controller>(DeezerOauth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
