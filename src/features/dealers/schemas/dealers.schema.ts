import { z } from 'zod';
import { DealerStatus } from '../types';

export const dealerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(DealerStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type DealerFormValues = z.infer<typeof dealerSchema>;
