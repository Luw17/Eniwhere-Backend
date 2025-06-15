import { Test, TestingModule } from '@nestjs/testing';
import { OrdensController } from './ordens.controller';

describe('OrdensController', () => {
  let controller: OrdensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdensController],
    }).compile();

    controller = module.get<OrdensController>(OrdensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
