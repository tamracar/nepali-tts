import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TtsService } from './tts/tts.service';
import { TtsController } from './tts/tts.controller';

@Module({
  imports: [],
  controllers: [AppController, TtsController],
  providers: [AppService, TtsService],
})
export class AppModule {}
