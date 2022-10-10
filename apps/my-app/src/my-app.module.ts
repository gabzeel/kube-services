import { Module } from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { MQTTModule } from '@kube-service/mqtt';
import { AMQPModule } from '../../../libs/amqp/src';
import { RedisModule } from '../../../libs/redis/src';

@Module({
  imports: [
    MQTTModule.forRootAsync(),
    AMQPModule.forRootAsync(),
    RedisModule.forRootAsync(),
  ],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule {}
