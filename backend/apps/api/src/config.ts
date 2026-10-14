import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { z } from 'zod';

dotenv.config({ path: resolve(process.cwd(), '../../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_ORIGINS: z.string().default('http://localhost:5173,http://localhost:5174'),
});

export const env = envSchema.parse(process.env);
export const webOrigins = env.WEB_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);
