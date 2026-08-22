import { z } from 'zod';

export const dealerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  company: z.string().min(1, 'Company is required').max(160),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  region: z.string().max(120).optional().or(z.literal('')),
  gst_number: z.string().max(20).optional().or(z.literal('')),
});

export type DealerFormValues = z.infer<typeof dealerSchema>;
