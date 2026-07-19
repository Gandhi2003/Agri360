import { z } from 'zod';
import { PurchaseStatus } from '../types';

export const purchaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(PurchaseStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type PurchaseFormValues = z.infer<typeof purchaseSchema>;
