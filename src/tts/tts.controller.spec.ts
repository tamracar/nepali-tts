import { Test, TestingModule } from '@nestjs/testing';
import { TtsController } from './tts.controller';

describe('TtsController', () => {
  let controller: TtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TtsController],
    }).compile();

    controller = module.get<TtsController>(TtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
