import { Module } from '@nestjs/common';
import { MQTTModule } from '@kube-service/mqtt';
import { AMQPModule } from '../../../libs/amqp/src';
import { RedisModule } from '../../../libs/redis/src';
import { AMQP } from './amqp-service.service';
import { TestModule } from '../../../libs/test/src';
import { AmqpController } from './amqp.controller';

@Module({
  imports: [
    TestModule.forRootAsync(),
    MQTTModule.forRootAsync({
      connectionUrl: 'mqtt://localhost:1883',
    }),
    AMQPModule.forRootAsync({
      connectionUrl: 'amqp://localhost',
    }),
    RedisModule.forRootAsync({
      connectionUrl: 'redis://localhost',
    }),
  ],
  providers: [AMQP],
  controllers: [AmqpController],
})
export class AMQPServiceModule {}
