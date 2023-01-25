import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';

describe('ActionService', () => {
  let action: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService],
    }).compile();

    action = module.get<ActionService>(ActionService);
  });

  it('should be defined', () => {
    expect(action).toBeDefined();
  });
});
