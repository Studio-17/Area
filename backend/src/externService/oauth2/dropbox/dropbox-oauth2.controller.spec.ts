import { Test, TestingModule } from '@nestjs/testing';
import { DropboxOauth2Controller } from './dropbox-oauth2.controller';

describe('DeezerController', () => {
  let controller: DropboxOauth2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DropboxOauth2Controller],
    }).compile();

    controller = module.get<DropboxOauth2Controller>(DropboxOauth2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
