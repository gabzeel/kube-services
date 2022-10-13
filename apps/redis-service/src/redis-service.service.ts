import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../libs/redis/src';
import {
  ITestIterations,
  TestService,
  TEST_CHANNEL_OR_QUEUE,
} from '../../../libs/test/src';

@Injectable()
export class Redis implements OnApplicationBootstrap {
  constructor(
    private readonly testService: TestService,
    private readonly redisService: RedisService,
  ) {}

  async onApplicationBootstrap() {
    await this.redisService.subscribe({
      channel: TEST_CHANNEL_OR_QUEUE,
      callback: this.execute.bind(this),
    });
  }

  async execute(message: ITestIterations) {
    this.testService.runIteration(message);
  }
}
