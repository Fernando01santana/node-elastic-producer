import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheReadService } from './services/redis.service';

@Module({
  providers: [CacheReadService],
  exports: [CacheReadService],
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: `redis://@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
  ],
})
export class CacheRedisModule {}
