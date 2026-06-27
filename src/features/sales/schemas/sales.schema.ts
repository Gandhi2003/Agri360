import { z } from 'zod';
import { SaleStatus } from '../types';

/** Zod schema mirroring Create/Update Sale payloads. */
export const saleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(SaleStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type SaleFormValues = z.infer<typeof saleSchema>;
