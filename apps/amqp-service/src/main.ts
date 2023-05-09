import { NestFactory } from '@nestjs/core';
import { AMQPServiceModule } from './amqp-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AMQPServiceModule);
  await app.listen(4001);
}

bootstrap().catch((error) => console.log(error));
