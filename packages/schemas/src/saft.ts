import { z } from 'zod';

export const SaftUploadSchema = z.object({
  filename: z.string().min(3),
  contentBase64: z.string().min(10),
});

export type SaftUpload = z.infer<typeof SaftUploadSchema>;