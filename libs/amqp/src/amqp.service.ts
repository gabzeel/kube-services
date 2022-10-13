import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';
import { AMQP_OPTIONS_PROVIDER } from './amqp.const';
import { IAMQPModuleOptions, IAMQPSubscribeOptions } from './amqp.interface';

@Injectable()
export class AMQPService implements OnApplicationBootstrap {
  private connection: Connection;
  private channel: Channel;

  constructor(
    @Inject(AMQP_OPTIONS_PROVIDER)
    private amqpOptions: IAMQPModuleOptions,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.connection = await connect(
        this.amqpOptions.connectionUrl || 'amqp://localhost',
      );
      this.channel = await this.connection.createChannel();
    } catch (error) {
      throw new Error('Error to connect to AMQP');
    }
  }

  publish(queue: string, message: Record<string, any>) {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async subscribe(options: IAMQPSubscribeOptions) {
    try {
      await this.channel.assertQueue(options.queue);

      this.channel.consume(
        options.queue,
        async (message) => {
          const payload = JSON.parse(message.content.toString());

          options.callback(payload);
        },
        { noAck: true },
      );
    } catch (error) {
      throw error;
    }
  }
}
