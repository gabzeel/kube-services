import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { TestService } from './test.service';

@Global()
@Module({})
export class TestModule {
  static forRootAsync(): DynamicModule {
    return {
      module: TestModule,
      providers: [TestService],
      exports: [TestService],
    };
  }
}
