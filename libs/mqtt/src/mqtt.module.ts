import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { MQTT_OPTIONS_PROVIDER } from './mqtt.const';
import { IMQTTModuleOptions } from './mqtt.interface';
import { MQTTService } from './mqtt.service';

@Global()
@Module({})
export class MQTTModule {
  static forRootAsync(options?: IMQTTModuleOptions): DynamicModule {
    return {
      module: MQTTModule,
      providers: [
        {
          provide: MQTT_OPTIONS_PROVIDER,
          useValue: options || {},
        },
        MQTTService,
      ],
      exports: [MQTTService],
    };
  }
}
