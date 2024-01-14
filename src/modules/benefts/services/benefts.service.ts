import { Injectable } from '@nestjs/common';

import {
  BenefitsResponseDto,
  RequestBenefitsDto,
} from 'src/shared/common/axios/benefits.dto';
import { HttpService } from 'src/shared/common/axios/httpService';
import { ClientProxyApplication } from 'src/shared/common/rabbitmq/clientProxy/clientProxy';
import { CacheReadService } from 'src/shared/common/redis/services/redis.service';
import { benefitsQueueRequest } from '../dtos/benefts.dto';
import BenefitsInterface from '../interfaces/benefts.interface';

@Injectable()
export class BenefitsService implements BenefitsInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly rabbitmqService: ClientProxyApplication,
    private readonly redisService: CacheReadService,
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
    //   documents.documents.forEach(async (element) => {
    //     const keyCache = `customer-${element.substring(0, 3)}`;
    //     await this.cacheWriteService.addInformationToCache(keyCache, element);
    // });

    // const documentExists = await this.redisService.readInformationFromCache(
    //   `customer-${element.substring(0, 3)}`,
    // );

    documents.documents.forEach(async (element) => {
      this.rabbitmqService
        .getClientProxy()
        .emit('documents-benefits', JSON.stringify(element));
    });
  }
}
