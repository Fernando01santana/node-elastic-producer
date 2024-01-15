import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from 'dotenv';
import { RequestTokenDto } from './auth.dto';
import { BenefitsResponseDto } from './benefits.dto';
config();
@Injectable()
export class HttpService {
  private readonly authenticationHost: string = process.env.AUTHENTICATION_HOST;

  async getBenefits(document: string): Promise<BenefitsResponseDto> {
    const dataAuth = await this.getToken();
    const headers = {
      Authorization: `Bearer ${dataAuth.token}`,
    };
    const url = '/api/v1/inss/consulta-beneficios?cpf=';
    const endpoint = `${this.authenticationHost}${url}${document}`;
    const response: AxiosResponse = await axios.get(endpoint, {
      headers: headers,
    });
    const benefitData: BenefitsResponseDto = {
      success: response.data.success,
      data: {
        beneficios: response.data.data.beneficios,
        cpf: response.data.data.cpf,
      },
    };

    return benefitData;
  }

  async getToken(): Promise<RequestTokenDto> {
    try {
      const url = 'api/v1/token';
      const data = {
        username: process.env.EXTERNAL_API_USERNAME,
        password: process.env.EXTERNAL_API_PASSWORD,
      };
      const endpoint = `${this.authenticationHost}/${url}`;
      const response: AxiosResponse = await axios.post(endpoint, data);

      const tokenDto: RequestTokenDto = {
        token: response.data.data.token,
        expiresIn: response.data.data.expiresIn,
        success: response.data.success,
      };

      return tokenDto;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: AxiosError) {
    console.error('HTTP Request Error:', error.message);
    throw new Error('Failed to make HTTP request');
  }
}
