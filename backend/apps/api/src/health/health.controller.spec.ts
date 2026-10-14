import { ServiceUnavailableException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe, expect, it, vi } from 'vitest';
import { DatabaseService } from '../database.service';
import { RedisService } from '../redis.service';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('reports readiness when PostgreSQL and Redis respond', async () => {
    const controller = new HealthController(
      { $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]) } as never,
      { client: { ping: vi.fn().mockResolvedValue('PONG') } } as never,
    );

    await expect(controller.ready()).resolves.toEqual({
      status: 'ready',
      dependencies: { postgres: true, redis: true },
    });
  });

  it('reports 503 when a required dependency is unavailable', async () => {
    const controller = new HealthController(
      { $queryRaw: vi.fn().mockRejectedValue(new Error('db down')) } as never,
      { client: { ping: vi.fn().mockResolvedValue('PONG') } } as never,
    );

    await expect(controller.ready()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('keeps the API ready when only the optional Redis cache is unavailable', async () => {
    const controller = new HealthController(
      { $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]) } as never,
      { client: { ping: vi.fn().mockRejectedValue(new Error('redis down')) } } as never,
    );

    await expect(controller.ready()).resolves.toEqual({
      status: 'degraded',
      dependencies: { postgres: true, redis: false },
    });
  });

  it('injects concrete dependencies through the Nest application container', async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: DatabaseService, useValue: { $queryRaw: vi.fn().mockResolvedValue([]) } },
        { provide: RedisService, useValue: { client: { ping: vi.fn().mockResolvedValue('PONG') } } },
      ],
    }).compile();

    await expect(module.get(HealthController).ready()).resolves.toMatchObject({ status: 'ready' });
    await module.close();
  });
});
