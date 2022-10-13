import { Module } from '@nestjs/common';
import { AMQPModule } from '../../../libs/amqp/src';
import { MQTTModule } from '../../../libs/mqtt/src';
import { RedisModule } from '../../../libs/redis/src';
import { TestModule } from '../../../libs/test/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TestModule.forRootAsync(),
    MQTTModule.forRootAsync(),
    AMQPModule.forRootAsync(),
    RedisModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
