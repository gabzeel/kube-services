import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AMQPService } from '../../../libs/amqp/src';
import {
  ITestIterations,
  TestService,
  TEST_CHANNEL_OR_QUEUE,
} from '../../../libs/test/src';

@Injectable()
export class AMQP implements OnApplicationBootstrap {
  constructor(
    private readonly testService: TestService,
    private readonly amqpService: AMQPService,
  ) {}

  async onApplicationBootstrap() {
    await this.amqpService.subscribe({
      queue: TEST_CHANNEL_OR_QUEUE,
      callback: this.execute.bind(this),
    });
  }

  async execute(message: ITestIterations) {
    this.testService.runIteration(message);
  }
}
