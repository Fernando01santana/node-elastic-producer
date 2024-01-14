import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpService } from 'src/shared/common/axios/httpService';
import { ProxyRMQModule } from 'src/shared/common/rabbitmq/clientProxy/clientProxy.module';
import { BenefitsController } from './controllers/benefts.controller';
import { BenefitsService } from './services/benefts.service';

config();

@Module({
  controllers: [BenefitsController],
  providers: [HttpService, BenefitsService],
  imports: [ProxyRMQModule],
})
export class BenefitsModule {}
