import { Test, TestingModule } from '@nestjs/testing';
import { TypeformOauth2Controller } from './typeform-oauth2.controller';

describe('DeezerController', () => {
  let controller: TypeformOauth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeformOauth2Controller],
    }).compile();

    controller = module.get<TypeformOauth2Controller>(TypeformOauth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
