import { Test, TestingModule } from '@nestjs/testing';
import { MiroOAuth2Service } from './miro-oauth2.service';

describe('GoogleOAuth2Service', () => {
  let service: MiroOAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiroOAuth2Service],
    }).compile();

    service = module.get<MiroOAuth2Service>(MiroOAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
