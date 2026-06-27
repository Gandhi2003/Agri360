import { z } from 'zod';
import { WarehouseStatus } from '../types';

/** Zod schema mirroring Create/Update Warehouse payloads. */
export const warehouseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(WarehouseStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
