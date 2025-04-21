import { Controller, Post, Body, Res, Get, Param, Delete } from '@nestjs/common';
import { TtsService } from './tts.service';
import { Response } from 'express';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  async convertToSpeech(@Body() body: { text: string }, @Res() res: Response) {
    try {
      const { text } = body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      const filePath = await this.ttsService.convertToSpeech(text);
      const fileName = filePath.split('/').pop();

      return res.json({
        success: true,
        filePath: `/tts/audio/${fileName}`,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get('audio/:filename')
  async getAudioFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../output', filename);
    
    if (!existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileStream = createReadStream(filePath);
    res.setHeader('Content-Type', 'audio/wav');
    fileStream.pipe(res);
  }

  @Delete('audio/:filename')
  async deleteAudioFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../output', filename);
    
    try {
      await this.ttsService.deleteAudioFile(filePath);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}