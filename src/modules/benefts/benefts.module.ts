import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpService } from 'src/shared/common/axios/httpService';
import { ProxyRMQModule } from 'src/shared/common/rabbitmq/clientProxy/clientProxy.module';
import { CacheRedisModule } from 'src/shared/common/redis/redis.module';
import { BenefitsController } from './controllers/benefts.controller';
import { BenefitsService } from './services/benefts.service';

config();

@Module({
  controllers: [BenefitsController],
  providers: [HttpService, BenefitsService],
  imports: [ProxyRMQModule, CacheRedisModule],
})
export class BenefitsModule {}
