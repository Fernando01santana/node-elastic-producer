import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheReadService {
  private readonly logger = new Logger(CacheReadService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async readInformationFromCache(key: string): Promise<any> {
    const data = await this.cacheManager.get(key);

    if (data) {
      this.logger.log(`Dados lidos do cache com a chave '${key}'.`);
    } else {
      this.logger.warn(
        `Nenhum dado encontrado no cache para a chave '${key}'.`,
      );
    }

    return data;
  }
  async addInformationToCache(key: string, data: any): Promise<void> {
    const existingData = await this.cacheManager.get(key);
    if (existingData) {
      this.logger.warn(
        `Chave '${key}' já existe no cache. Não adicionando dados duplicados.`,
      );
      return;
    }

    await this.cacheManager.set(key, data);
    this.logger.log(`Dados adicionados ao cache com a chave '${key}'.`);
  }
}
