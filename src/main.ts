import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/nest-components/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
