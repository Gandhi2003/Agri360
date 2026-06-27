import { z } from 'zod';
import { RoleStatus } from '../types';

/** Zod schema mirroring Create/Update Role payloads. */
export const roleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(RoleStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
