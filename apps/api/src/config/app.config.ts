import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const appConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

export default registerAs('app', () => {
  const parsed = appConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid App Config: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
});
