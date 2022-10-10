import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AMQPService } from '../../../libs/amqp/src';
import { MQTTService } from '../../../libs/mqtt/src';
import { RedisService } from '../../../libs/redis/src';

@Injectable()
export class MyAppService implements OnApplicationBootstrap {
  constructor(
    private readonly mqttService: MQTTService,
    private readonly amqpService: AMQPService,
    private readonly redisService: RedisService,
  ) {}

  async onApplicationBootstrap() {
    await this.mqttService.subscribe({
      topic: 'test',
      callback: this.getHello.bind(this),
    });

    await this.amqpService.subscribe({
      queue: 'test',
      callback: this.getHello.bind(this),
    });

    await this.redisService.subscribe({
      channel: 'test',
      callback: this.getHello.bind(this),
    });
  }

  async getHello(message: any) {
    console.log(message);
    this.redisService.publish('test', { possa: 'posse' });
  }
}
