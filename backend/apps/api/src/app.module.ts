import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { HealthController } from './health/health.controller';
import { RedisService } from './redis.service';

@Module({
  controllers: [HealthController],
  providers: [DatabaseService, RedisService],
})
export class AppModule {}
