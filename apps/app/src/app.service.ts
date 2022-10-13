import { Injectable } from '@nestjs/common';
import { ITestIterations, TestService } from '../../../libs/test/src';

@Injectable()
export class AppService {
  constructor(private readonly testService: TestService) {}

  startScript(message: ITestIterations) {
    this.testService.runIteration(message);
  }
}
