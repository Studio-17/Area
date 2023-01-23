import { Test, TestingModule } from '@nestjs/testing';
import { CooniesService } from './coonies.service';

describe('CooniesService', () => {
  let service: CooniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CooniesService],
    }).compile();

    service = module.get<CooniesService>(CooniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
