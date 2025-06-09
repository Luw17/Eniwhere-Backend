import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    console.log(`Setting key: ${key}, TTL (s): ${ttlSeconds}`);
    await (this.cacheManager as any).set(key, value, { ttl: ttlSeconds });
  }

  async get<T>(key: string): Promise<T | null> {
    return (await this.cacheManager.get<T>(key)) ?? null;
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async has(key: string): Promise<boolean> {
    const value = await this.cacheManager.get(key);
    return value !== undefined && value !== null;
  }

  async healthCheck(): Promise<void> {
    const testKey = 'redis_health_check';
    try {
      await this.cacheManager.set(testKey, 'ok', 5000);
      const value = await this.cacheManager.get<string>(testKey);
      if (value === 'ok') {
        this.logger.log('✅ Redis funcionando');
      } else {
        this.logger.error('❌ Redis falhou ao ler valor de teste');
      }
    } catch (error) {
      this.logger.error('❌ Redis falhou na verificação de saúde', error);
    }
  }
}
