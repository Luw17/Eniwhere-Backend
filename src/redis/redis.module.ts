// redis.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
  useFactory: async () => ({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ttl: 0,
    isCacheableValue: () => true, 
  }),
}),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
