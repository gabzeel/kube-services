import { NestFactory } from '@nestjs/core';
import { MQTTServiceModule } from './mqtt-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MQTTServiceModule);
  await app.listen(3002);
}

bootstrap();
