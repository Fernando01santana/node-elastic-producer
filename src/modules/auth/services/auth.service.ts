import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/common/axios/httpService';
import { AuthRequest, AuthResponse } from '../dto/auth.dto';
import AuthInterface from '../interface/auth.interface';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(private readonly httpService: HttpService) {}

  async generateToken(data: AuthRequest): Promise<AuthResponse> {
    const url = 'api/v1/token';
    const dataToken = await this.httpService.getToken(url, data);
    if (!dataToken.sucess) {
      //escrever exception
    }

    return {
      access_token: dataToken.token,
      expiresIn: dataToken.expiresIn,
      success: dataToken.success,
    };
  }
}
