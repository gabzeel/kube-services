import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { REDIS_OPTIONS_PROVIDER } from './redis.const';
import { IRedisModuleOptions } from './redis.interface';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  static forRootAsync(options?: IRedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS_PROVIDER,
          useValue: options || {},
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
