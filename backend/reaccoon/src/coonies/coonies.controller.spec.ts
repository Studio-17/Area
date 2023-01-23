import { Test, TestingModule } from '@nestjs/testing';
import { CooniesController } from './coonies.controller';

describe('CooniesController', () => {
  let controller: CooniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CooniesController],
    }).compile();

    controller = module.get<CooniesController>(CooniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
