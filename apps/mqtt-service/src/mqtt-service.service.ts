import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { MQTTService } from '../../../libs/mqtt/src';
import {
  TestService,
  TEST_CHANNEL_OR_QUEUE,
  IMessage,
} from '../../../libs/test/src';

@Injectable()
export class MQTT implements OnApplicationBootstrap {
  constructor(
    private readonly testService: TestService,
    private readonly mqttService: MQTTService,
  ) {}

  async onApplicationBootstrap() {
    await this.mqttService.subscribe({
      topic: TEST_CHANNEL_OR_QUEUE,
      callback: this.execute.bind(this),
    });
  }

  async execute(message: IMessage) {
    this.testService.processMessage(message);
  }
}
