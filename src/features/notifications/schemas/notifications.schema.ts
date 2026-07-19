import { z } from 'zod';
import { NotificationStatus } from '../types';

export const notificationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(NotificationStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;
