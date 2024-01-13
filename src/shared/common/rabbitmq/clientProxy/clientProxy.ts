import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class ClientProxyApplication {
  private clientAdminBackend: ClientProxy;

  getClientProxy(): ClientProxy {
    return (this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'teste',
      },
    }));
  }
}
