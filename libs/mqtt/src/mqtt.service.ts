import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { connectAsync, AsyncMqttClient } from 'async-mqtt';
import { MQTT_OPTIONS_PROVIDER } from './mqtt.const';
import { IMQTTModuleOptions, IMQTTSubscribeOptions } from './mqtt.interface';

@Injectable()
export class MQTTService implements OnApplicationBootstrap {
  private client: AsyncMqttClient;
  private subscribers: IMQTTSubscribeOptions[] = [];

  constructor(
    @Inject(MQTT_OPTIONS_PROVIDER)
    private mqttOptions: IMQTTModuleOptions,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.client = await connectAsync(
        this.mqttOptions.connectionUrl || 'tcp://localhost:1883',
        undefined,
        false,
      );
    } catch (error) {
      throw new Error('Error to connect to MQTT');
    }
  }

  publish(channel: string, message: Record<string, any>) {
    return this.client.publish(channel, JSON.stringify(message));
  }

  async subscribe(options: IMQTTSubscribeOptions) {
    try {
      await this.client.subscribe(options.topic);

      this.subscribers.push(options);

      this.client.on('message', async (topic: string, message: string) => {
        const payload = JSON.parse(message);

        await Promise.all(
          this.subscribers
            .filter((subscribe) => subscribe.topic === topic)
            .map(async (subscribe) => subscribe.callback(payload)),
        );
      });
    } catch (error) {
      throw error;
    }
  }
}
