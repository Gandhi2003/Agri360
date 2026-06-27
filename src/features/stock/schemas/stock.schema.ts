import { z } from 'zod';
import { StockStatus } from '../types';

/** Zod schema mirroring Create/Update Stock payloads. */
export const stockSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(StockStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type StockFormValues = z.infer<typeof stockSchema>;
