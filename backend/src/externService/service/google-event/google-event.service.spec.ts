import { Test, TestingModule } from '@nestjs/testing';
import { GoogleEventService } from './google-event.service';

describe('GoogleEventService', () => {
  let service: GoogleEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleEventService],
    }).compile();

    service = module.get<GoogleEventService>(GoogleEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
