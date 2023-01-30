import { Test, TestingModule } from '@nestjs/testing';
import { MyActionService } from './myAction.service';

describe('MyActionService', () => {
  let service: MyActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyActionService],
    }).compile();

    service = module.get<MyActionService>(MyActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
