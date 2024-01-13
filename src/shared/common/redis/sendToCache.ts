import { Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheWriteService {
  private readonly logger = new Logger(CacheWriteService.name);

  constructor(private readonly cache: Cache) {}

  async addInformationToCache(key: string, data: any): Promise<void> {
    const existingData = await this.cache.get(key);
    if (existingData) {
      this.logger.warn(
        `Chave '${key}' já existe no cache. Não adicionando dados duplicados.`,
      );
      return;
    }

    await this.cache.set(key, data);
    this.logger.log(`Dados adicionados ao cache com a chave '${key}'.`);
  }
}
