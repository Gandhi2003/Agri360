import { z } from 'zod';
import { CropStatus } from '../types';

/** Zod schema mirroring Create/Update Crop payloads. */
export const cropSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(CropStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type CropFormValues = z.infer<typeof cropSchema>;
