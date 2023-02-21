import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { MQTT_OPTIONS_PROVIDER } from './mqtt.const';
import { IMQTTModuleOptions, IMQTTSubscribeOptions } from './mqtt.interface';

@Injectable()
export class MQTTService implements OnApplicationBootstrap {
  private client: MqttClient;
  private subscribers: IMQTTSubscribeOptions[] = [];

  constructor(
    @Inject(MQTT_OPTIONS_PROVIDER)
    private mqttOptions: IMQTTModuleOptions,
  ) {}

  async onApplicationBootstrap() {
    try {
      console.log(this.mqttOptions.connectionUrl);
      this.client = connect(this.mqttOptions.connectionUrl);
      await new Promise((res, rej) => {
        this.client.on('connect', function () {
          res(undefined);
        });

        this.client.on('error', function () {
          rej(undefined);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  publish(channel: string, message: Record<string, any>) {
    this.client.publish(channel, JSON.stringify(message));
  }

  async subscribe(options: IMQTTSubscribeOptions) {
    this.client.subscribe(options.topic, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
