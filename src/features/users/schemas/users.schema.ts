import { z } from 'zod';
import { UserStatus } from '../types';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(UserStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type UserFormValues = z.infer<typeof userSchema>;
