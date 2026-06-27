import { z } from 'zod';
import { SettingStatus } from '../types';

/** Zod schema mirroring Create/Update Setting payloads. */
export const settingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(SettingStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type SettingFormValues = z.infer<typeof settingSchema>;
