import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors();
  app.useGlobalPipes();
  await app.listen(3001);
}
bootstrap();
