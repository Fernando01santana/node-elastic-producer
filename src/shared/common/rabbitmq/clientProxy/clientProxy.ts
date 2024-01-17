import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class ClientProxyApplication {
  private clientProducer: ClientProxy;

  getClientProxy(): ClientProxy {
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
      throw error; // Lançar o erro para o chamador, se necessário
    }
  }
}
