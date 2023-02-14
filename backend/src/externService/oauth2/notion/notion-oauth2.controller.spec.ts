import { Test, TestingModule } from '@nestjs/testing';
import { NotionOAuth2Controller } from './notion-oauth2.controller';

describe('ConnectController', () => {
  let controller: NotionOAuth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotionOAuth2Controller],
    }).compile();

    controller = module.get<NotionOAuth2Controller>(NotionOAuth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
