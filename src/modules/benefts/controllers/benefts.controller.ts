import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BenefitsQueueRequestDto } from '../dtos/benefts.dto';
import { BenefitsService } from '../services/benefts.service';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Get()
  async benefits(@Query('cpf') cpf: string): Promise<any> {
    return await this.benefitsService.getBenefits(cpf);
  }

  @Post('documents')
  async documentsToQueue(@Body() data: BenefitsQueueRequestDto): Promise<any> {
    return await this.benefitsService.sendDocumnetToQueue(data);
  }
}
