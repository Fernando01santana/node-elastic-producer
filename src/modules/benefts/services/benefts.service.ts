import { Injectable } from '@nestjs/common';

import {
  BenefitsResponseDto,
  RequestBenefitsDto,
} from 'src/shared/common/axios/benefits.dto';
import { HttpService } from 'src/shared/common/axios/httpService';
import { ClientProxyApplication } from 'src/shared/common/rabbitmq/clientProxy/clientProxy';
import { benefitsQueueRequest } from '../dtos/benefts.dto';
import BenefitsInterface from '../interfaces/benefts.interface';

@Injectable()
export class BenefitsService implements BenefitsInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly rabbitmqService: ClientProxyApplication,
  ) {}
  async getBenefits(
    document: string,
    token: string,
  ): Promise<BenefitsResponseDto> {
    const data: RequestBenefitsDto = {
      document: document,
      token: token,
    };
    const benefits = await this.httpService.getBenefits(data);
    return benefits;
  }

  async sendDocumntToQueue(documents: benefitsQueueRequest) {
    documents.documents.forEach(async (element) => {
      this.rabbitmqService
        .getClientProxy()
        .emit('documents-benefits', JSON.stringify(element));
    });
  }
}
