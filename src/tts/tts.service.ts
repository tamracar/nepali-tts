import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';

@Injectable()
export class TtsService {
  private readonly outputDir = join(__dirname, '../../output');

  constructor() {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir);
    }
  }

  async convertToSpeech(text: string): Promise<string> {
    // This is a simplified approach using eSpeak-ng (will be installed in Docker)
    // For Nepali, we'll use the Nepali language code 'ne'
    
    const fileName = `tts_${Date.now()}.wav`;
    const filePath = join(this.outputDir, fileName);
    
    try {
      // Using eSpeak-ng for text-to-speech
      execSync(`espeak-ng -v ne "${text}" --stdout > ${filePath}`);
      
      return filePath;
    } catch (error) {
      console.error('TTS conversion error:', error);
      throw new Error('Failed to convert text to speech');
    }
  }

  async deleteAudioFile(filePath: string): Promise<void> {
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting audio file:', error);
    }
  }
}