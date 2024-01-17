import { HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
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

    let benefitData: BenefitsResponseDto;
    if (response && response.status === HttpStatusCode.Ok) {
      benefitData.success = response.data.success;
      benefitData.data.beneficios = response.data.data.beneficios;
      benefitData.data.cpf = response.data.data.cpf;

      return benefitData;
    }

    if (response.status >= HttpStatusCode.BadRequest) {
      throw new Error(response.statusText);
    }
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
      let token: RequestTokenDto;

      if (response && response.status === HttpStatus.OK) {
        token.expiresIn = response.data.data.expiresIn;
        token.success = response.data.data.success;
        token.token = response.data.data.token;
        return token;
      }
      if (response.status >= HttpStatusCode.BadRequest) {
        throw new Error(response.statusText);
      }
      return token;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: AxiosError) {
    console.error('HTTP Request Error:', error.message);
    throw new Error('Failed to make HTTP request');
  }
}
