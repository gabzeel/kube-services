import { Body, Controller, Post } from '@nestjs/common';
import { IMessage } from '../../../libs/test/src';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/start')
  startScript(@Body() message: IMessage) {
    return this.appService.startScript(message);
  }
}
