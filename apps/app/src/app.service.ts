import { Injectable } from '@nestjs/common';
import { IMessage, TestService } from '../../../libs/test/src';

@Injectable()
export class AppService {
  constructor(private readonly testService: TestService) {}

  startScript(message: IMessage) {
    return this.testService.publishMessage(message);
  }
}
