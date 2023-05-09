import { NestFactory } from '@nestjs/core';
import { MQTTServiceModule } from './mqtt-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MQTTServiceModule);
  await app.listen(4002);
}

bootstrap();
