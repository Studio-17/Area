import { Test, TestingModule } from '@nestjs/testing';
import { DropboxOauth2Service } from './dropbox-oauth2.service';

describe('DropboxService', () => {
  let service: DropboxOauth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DropboxOauth2Service],
    }).compile();

    service = module.get<DropboxOauth2Service>(DropboxOauth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
