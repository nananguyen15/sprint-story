import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { RedisService } from '../redis.service';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService,
    @Inject(RedisService) private readonly redis: RedisService,
  ) {}

  @Get('live')
  live() {
    return { status: 'ok' };
  }

  @Get('ready')
  async ready() {
    const checks = await Promise.allSettled([
      this.db.$queryRaw`SELECT 1`,
      this.redis.client.ping(),
    ]);
    const dependencies = {
      postgres: checks[0].status === 'fulfilled',
      redis: checks[1].status === 'fulfilled',
    };
    if (!dependencies.postgres) {
      throw new ServiceUnavailableException({ status: 'not_ready', dependencies });
    }
    return { status: dependencies.redis ? 'ready' : 'degraded', dependencies };
  }
}
