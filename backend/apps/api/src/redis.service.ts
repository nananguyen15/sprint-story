import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from './config';

@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    retryStrategy: (attempt) => Math.min(attempt * 250, 2000),
  });

  async connect() {
    if (this.client.status === 'wait') await this.client.connect();
  }

  async onModuleDestroy() {
    this.client.disconnect();
  }
}
