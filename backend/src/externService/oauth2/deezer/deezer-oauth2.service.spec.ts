import { Test, TestingModule } from '@nestjs/testing';
import { DeezerOauth2Service } from './deezer-oauth2.service';

describe('DeezerService', () => {
  let service: DeezerOauth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeezerOauth2Service],
    }).compile();

    service = module.get<DeezerOauth2Service>(DeezerOauth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
