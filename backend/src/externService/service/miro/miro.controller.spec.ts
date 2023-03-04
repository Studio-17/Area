import { Test, TestingModule } from '@nestjs/testing';
import { MiroController } from './miro.controller';

describe('MiroController', () => {
  let controller: MiroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiroController],
    }).compile();

    controller = module.get<MiroController>(MiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
