import { Injectable, Logger } from '@nestjs/common';
import { AMQPService } from '../../amqp/src';
import { RedisService } from '../../redis/src';
import { MQTTService } from '../../mqtt/src';
import { IMessage, IResult } from './test.interface';
import { ETestIterationType } from './test.enum';
import { TEST_CHANNEL_OR_QUEUE } from './test.const';
import { writeFileSync } from 'fs';

@Injectable()
export class TestService {
  private readonly logger = new Logger();

  constructor(
    private readonly mqttService: MQTTService,
    private readonly amqpService: AMQPService,
    private readonly redisService: RedisService,
  ) {}

  private results: IResult = {
    startDate: new Date(),
    endDate: new Date(),
    messages: [],
  };

  async publishMessage(message: IMessage) {
    message.startDate = new Date();

    switch (message.iterationType) {
      case ETestIterationType.REDIS:
        return this.redisService.publish(TEST_CHANNEL_OR_QUEUE, message);
      case ETestIterationType.AMQP:
        return this.amqpService.publish(TEST_CHANNEL_OR_QUEUE, message);
      case ETestIterationType.MQTT:
        return this.mqttService.publish(TEST_CHANNEL_OR_QUEUE, message);
    }
  }

  async processMessage(message: IMessage) {
    const dateNow = new Date();

    if (this.results.messages.length === 0) {
      this.results = {
        startDate: new Date(),
        endDate: new Date(),
        messages: [],
      };
    }

    this.results.messages.push({
      startDate: message.startDate,
      endDate: dateNow,
    });

    if (this.results.messages.length >= (message.limit || 1000)) {
      this.results.endDate = dateNow;

      const fileName = `results/result_${message.name}.json`;

      writeFileSync(fileName, JSON.stringify(this.results));

      this.logger.log(`Test ${message.name} finished`);

      this.results = {
        startDate: new Date(),
        endDate: new Date(),
        messages: [],
      };

      return;
    }

    await this.publishMessage(message);
  }
}
