import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { benefitsQueueRequest } from '../dtos/benefts.dto';
import { BenefitsService } from '../services/benefts.service';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Get()
  async benefits(
    @Query('cpf') cpf: string,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<any> {
    return await this.benefitsService.getBenefits(cpf, authorizationHeader);
  }

  @Post('documents')
  async documentsToQueue(@Body() data: benefitsQueueRequest): Promise<any> {
    return await this.benefitsService.sendDocumntToQueue(data);
  }
}
