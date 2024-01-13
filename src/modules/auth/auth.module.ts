import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpService } from 'src/shared/common/axios/httpService';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

config();
@Module({
  controllers: [AuthController],
  providers: [AuthService, HttpService],
})
export class AuthModule {}
