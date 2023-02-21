import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { AMQPService } from '../../../libs/amqp/src';
import { RedisService } from '../../../libs/redis/src';
import { MQTTService } from '../../mqtt/src';
import { TEST_CHANNEL_OR_QUEUE } from './test.const';
import { ETestIterationType } from './test.enum';
import { FinalResult, ITestIterations } from './test.interface';

@Injectable()
export class TestService {
  constructor(
    private readonly mqttService: MQTTService,
    private readonly amqpService: AMQPService,
    private readonly redisService: RedisService,
  ) {}

  async runIteration(message: ITestIterations) {
    if (!message.results) {
      message.startDate = new Date();
      message.results = [];
      message.executedIterations = 0;
    }

    const lasResult =
      message.results.length > 0
        ? message.results[message.results.length - 1]
        : undefined;

    if (lasResult) {
      lasResult.startDate = new Date(lasResult.startDate);
      lasResult.endDate = new Date();

      lasResult.timeDiff =
        lasResult.endDate.getTime() - new Date(lasResult.startDate).getTime();
    }

    if (
      message.results.length -
        (message.executedIterations || 0) * message.stages.length ===
      message.stages.length
    ) {
      if (message.iterations == 1) {
        return this.finishTest(message);
      } else {
        message.iterations--;
        message.executedIterations++;

        message.currentStage = undefined;
      }
    }

    message.currentStage =
      message.currentStage !== undefined ? message.currentStage + 1 : 0;

    message.bytes =
      message.stages[message.currentStage].bytes > 1
        ? randomBytes(message.stages[message.currentStage].bytes)
        : undefined;

    message.results.push({
      type: message.stages[message.currentStage].type,
      startDate: new Date(),
      iteration: message.currentStage,
      bytes: message.stages[message.currentStage].bytes,
    });

    this.publisMessage(message.stages[message.currentStage].type, message);
  }

  private publisMessage(
    interationType: ETestIterationType,
    message: ITestIterations,
  ) {
    switch (interationType) {
      case ETestIterationType.REDIS:
        return this.redisService.publish(TEST_CHANNEL_OR_QUEUE, message);
      case ETestIterationType.AMQP:
        return this.amqpService.publish(TEST_CHANNEL_OR_QUEUE, message);
      case ETestIterationType.MQTT:
        return this.mqttService.publish(TEST_CHANNEL_OR_QUEUE, message);
    }

    throw new Error('Publish service not found');
  }

  private finishTest(message: ITestIterations) {
    message.startDate = new Date(message.startDate);
    message.endDate = new Date();

    message.timeDiff =
      message.endDate.getTime() - new Date(message.startDate).getTime();

    let resultJSON: FinalResult = undefined;
    // let fileString = undefined;

    const fileName = `results/result_${message.test}.json`;

    const currentData = {
      startDate: message.startDate,
      endDate: message.endDate,
      timeDiff: message.timeDiff,
      resultsCount: message.results.length,
      results: message.results,
    };

    // try {
    //   fileString = readFileSync(fileName);
    // } catch {}

    // if (resultJSON !== undefined) {
    //   resultJSON = JSON.parse(fileString);

    //   resultJSON.iterations.push(currentData);
    // } else {
    //   resultJSON = {
    //     iterations: [currentData],
    //   };
    // }

    resultJSON = {
      ...currentData,
    };

    writeFileSync(fileName, JSON.stringify(resultJSON));
  }
}
