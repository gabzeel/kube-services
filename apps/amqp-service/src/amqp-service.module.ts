import { Module } from '@nestjs/common';
import { MQTTModule } from '@kube-service/mqtt';
import { AMQPModule } from '../../../libs/amqp/src';
import { RedisModule } from '../../../libs/redis/src';
import { AMQP } from './amqp-service.service';
import { TestModule } from '../../../libs/test/src';

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
})
export class AMQPServiceModule {}
