import { Test, TestingModule } from '@nestjs/testing';
import { GoogleEventController } from '././google-event.controller';

describe('GoogleEventController', () => {
  let controller: GoogleEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleEventController],
    }).compile();

    controller = module.get<GoogleEventController>(GoogleEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
