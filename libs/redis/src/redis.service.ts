import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_OPTIONS_PROVIDER } from './redis.const';
import { IRedisModuleOptions, IRedisSubscribeOptions } from './redis.interface';

@Injectable()
export class RedisService implements OnApplicationBootstrap {
  private pub: Redis;
  private sub: Redis;
  private subscribers: IRedisSubscribeOptions[] = [];

  constructor(
    @Inject(REDIS_OPTIONS_PROVIDER)
    private redisOptions: IRedisModuleOptions,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.pub = new Redis();
      this.sub = new Redis();

      // await Promise.all([
      //   new Promise((res, rej) => {
      //     this.pub.connect((err) => {
      //       if (err) {
      //         rej(err);
      //       } else {
      //         res(undefined);
      //       }
      //     });
      //   }),
      //   new Promise((res, rej) => {
      //     this.sub.connect((err) => {
      //       if (err) {
      //         rej(err);
      //       } else {
      //         res(undefined);
      //       }
      //     });
      //   }),
      // ]);
    } catch (error) {
      throw new Error('Error to connect to MQTT');
    }
  }

  publish(channel: string, message: Record<string, any>) {
    return this.pub.publish(channel, JSON.stringify(message));
  }

  async subscribe(options: IRedisSubscribeOptions) {
    try {
      const subscribePromise = new Promise((res, rej) => {
        this.sub.subscribe(options.channel, (err) => {
          if (err) {
            rej(err);
          } else {
            res(undefined);
          }
        });
      });

      await subscribePromise;

      this.sub.on('message', (channel, message) => {
        if (channel === options.channel) {
          const payload = JSON.parse(message);

          options.callback(payload);
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
