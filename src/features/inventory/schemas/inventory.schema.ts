import { z } from 'zod';
import { InventoryStatus } from '../types';

/** Zod schema mirroring Create/Update Inventory payloads. */
export const inventorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(InventoryStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;
