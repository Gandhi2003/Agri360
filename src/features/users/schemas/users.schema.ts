import { z } from 'zod';
import { UserStatus } from '../types';

export const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(60),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(60),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(UserStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type UserFormValues = z.infer<typeof userSchema>;
