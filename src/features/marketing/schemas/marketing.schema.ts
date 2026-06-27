import { z } from 'zod';
import { MarketingStatus } from '../types';

/** Zod schema mirroring Create/Update Marketing payloads. */
export const marketingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(MarketingStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type MarketingFormValues = z.infer<typeof marketingSchema>;
