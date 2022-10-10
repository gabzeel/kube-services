import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { AMQP_OPTIONS_PROVIDER } from './amqp.const';
import { IAMQPModuleOptions } from './amqp.interface';
import { AMQPService } from './amqp.service';

@Global()
@Module({})
export class AMQPModule {
  static forRootAsync(options?: IAMQPModuleOptions): DynamicModule {
    return {
      module: AMQPModule,
      providers: [
        {
          provide: AMQP_OPTIONS_PROVIDER,
          useValue: options || {},
        },
        AMQPService,
      ],
      exports: [AMQPService],
    };
  }
}
