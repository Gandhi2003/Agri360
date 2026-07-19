import { z } from 'zod';
import { ProfileStatus } from '../types';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(ProfileStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
