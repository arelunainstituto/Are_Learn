import { z } from 'zod';

export const Env = z.object({
  DATABASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
});

export const env = Env.parse(process.env);