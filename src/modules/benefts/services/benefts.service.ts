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
    const url = '/api/v1/inss/consulta-beneficios?cpf=';
    const data: RequestBenefitsDto = {
      document: document,
      token: token,
    };
    const benefits = await this.httpService.getBenefits(url, data);
    return benefits;
  }

  async sendDocumntToQueue(documents: benefitsQueueRequest) {
    await this.rabbitmqService
      .getClientProxy()
      .emit(
        'documents_benefits',
        Buffer.from(JSON.stringify(documents.documents)),
      );
  }
}
