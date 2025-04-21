import { Test, TestingModule } from '@nestjs/testing';
import { TtsService } from './tts.service';

describe('TtsService', () => {
  let service: TtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TtsService],
    }).compile();

    service = module.get<TtsService>(TtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
