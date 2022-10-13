import { Body, Controller, Post } from '@nestjs/common';
import { ITestIterations } from '../../../libs/test/src';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/start')
  startScript(@Body() message: ITestIterations) {
    return this.appService.startScript(message);
  }

  @Post('/end')
  endScript(@Body() message: ITestIterations) {
    console.log(message);
  }
}
