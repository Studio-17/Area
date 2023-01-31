import { Test, TestingModule } from '@nestjs/testing';
import { MyActionController } from './myAction.controller';

describe('MyActionController', () => {
  let controller: MyActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyActionController],
    }).compile();

    controller = module.get<MyActionController>(MyActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
