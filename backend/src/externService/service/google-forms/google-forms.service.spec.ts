import { Test, TestingModule } from '@nestjs/testing';
import { GoogleFormsService } from './google-forms.service';

describe('GoogleFormsService', () => {
  let service: GoogleFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleFormsService],
    }).compile();

    service = module.get<GoogleFormsService>(GoogleFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
