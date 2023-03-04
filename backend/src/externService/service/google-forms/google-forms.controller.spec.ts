import { Test, TestingModule } from '@nestjs/testing';
import { GoogleFormsController } from './google-forms.controller';

describe('GoogleFormsController', () => {
  let controller: GoogleFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleFormsController],
    }).compile();

    controller = module.get<GoogleFormsController>(GoogleFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
