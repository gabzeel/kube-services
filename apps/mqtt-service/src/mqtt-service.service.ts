import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { MQTTService } from '../../../libs/mqtt/src';
import {
  ITestIterations,
  TestService,
  TEST_CHANNEL_OR_QUEUE,
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

  async execute(message: ITestIterations) {
    this.testService.runIteration(message);
  }
}
