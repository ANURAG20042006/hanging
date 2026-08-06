import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const jwtConfigSchema = z.object({
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
});

export default registerAs('jwt', () => {
  const parsed = jwtConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid JWT Config: ${JSON.stringify(parsed.error.format())}`);
  }
  return parsed.data;
});
