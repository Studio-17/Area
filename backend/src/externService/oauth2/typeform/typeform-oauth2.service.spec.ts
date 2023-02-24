import { Test, TestingModule } from '@nestjs/testing';
import { TypeformOauth2Service } from './typeform-oauth2.service';

describe('DropboxService', () => {
  let service: TypeformOauth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeformOauth2Service],
    }).compile();

    service = module.get<TypeformOauth2Service>(TypeformOauth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
