import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public'));
  app.setViewEngine('html');

  await app.listen(3000, '0.0.0.0');
  app.enableCors({
    origin: '*',  // Allow all origins (adjust for production)
  });
}
bootstrap();