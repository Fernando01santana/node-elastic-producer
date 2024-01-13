import { Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheReadService {
  private readonly logger = new Logger(CacheReadService.name);

  constructor(private readonly cache: Cache) {}

  async readInformationFromCache(key: string): Promise<any> {
    const data = await this.cache.get(key);

    if (data) {
      this.logger.log(`Dados lidos do cache com a chave '${key}'.`);
    } else {
      this.logger.warn(
        `Nenhum dado encontrado no cache para a chave '${key}'.`,
      );
    }

    return data;
  }
}
