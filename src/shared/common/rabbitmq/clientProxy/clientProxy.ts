import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class ClientProxyApplication {
  private clientProducer: ClientProxy;

  async getClientProxy(): Promise<ClientProxy> {
    try {
      return (this.clientProducer = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: process.env.RABBIRMQ_QUEUE_NAME,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
