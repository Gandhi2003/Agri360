import { z } from 'zod';
import { DeliveryStatus } from '../types';

/** Zod schema mirroring Create/Update Delivery payloads. */
export const deliverySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(DeliveryStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type DeliveryFormValues = z.infer<typeof deliverySchema>;
