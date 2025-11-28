import { z } from 'zod';

export const QrGenerateRequestSchema = z.object({
  data: z.string().min(1),
  size: z.number().int().min(64).max(2048).default(256),
});

export type QrGenerateRequest = z.infer<typeof QrGenerateRequestSchema>;