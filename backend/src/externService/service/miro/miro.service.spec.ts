import { Test, TestingModule } from '@nestjs/testing';
import { MiroService } from './miro.service';

describe('MiroService', () => {
  let service: MiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiroService],
    }).compile();

    service = module.get<MiroService>(MiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
