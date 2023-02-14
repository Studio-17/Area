import { Test, TestingModule } from '@nestjs/testing';
import { NotionOAuth2Service } from './notion-oauth2.service';

describe('GoogleOAuth2Service', () => {
  let service: NotionOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotionOAuth2Service],
    }).compile();

    service = module.get<NotionOAuth2Service>(NotionOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
