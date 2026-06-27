import { z } from 'zod';
import { CustomerStatus } from '../types';

/** Zod schema mirroring Create/Update Customer payloads. */
export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(CustomerStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
