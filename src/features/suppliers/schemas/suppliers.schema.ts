import { z } from 'zod';
import { SupplierStatus } from '../types';

/** Zod schema mirroring Create/Update Supplier payloads. */
export const supplierSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(SupplierStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
