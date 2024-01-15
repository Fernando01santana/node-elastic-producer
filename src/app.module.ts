import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BenefitsModule } from './modules/benefts/benefts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BenefitsModule,
  ],
})
export class AppModule {}
