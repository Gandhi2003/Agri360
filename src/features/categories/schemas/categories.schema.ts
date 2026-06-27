import { z } from 'zod';
import { CategoryStatus } from '../types';

/** Zod schema mirroring Create/Update Category payloads. */
export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(CategoryStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
