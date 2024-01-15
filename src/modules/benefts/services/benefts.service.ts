import { Injectable } from '@nestjs/common';

import { BenefitsResponseDto } from 'src/shared/common/axios/benefits.dto';
import { HttpService } from 'src/shared/common/axios/httpService';
import { ClientProxyApplication } from 'src/shared/common/rabbitmq/clientProxy/clientProxy';
import { BenefitsQueueRequestDto } from '../dtos/benefts.dto';
import BenefitsInterface from '../interfaces/benefts.interface';

@Injectable()
export class BenefitsService implements BenefitsInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly rabbitmqService: ClientProxyApplication,
  ) {}
  async getBenefits(document: string): Promise<BenefitsResponseDto> {
    const benefits = await this.httpService.getBenefits(document);
    return benefits;
  }

  async sendDocumnetToQueue(documents: BenefitsQueueRequestDto) {
    documents.documents.forEach(async (element) => {
      await this.rabbitmqService
        .getClientProxy()
        .then((clientProxy) =>
          clientProxy.emit('documents-benefits', JSON.stringify(element)),
        );
    });
  }
}
