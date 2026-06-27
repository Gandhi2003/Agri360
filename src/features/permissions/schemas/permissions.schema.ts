import { z } from 'zod';
import { PermissionStatus } from '../types';

/** Zod schema mirroring Create/Update Permission payloads. */
export const permissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(PermissionStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;
