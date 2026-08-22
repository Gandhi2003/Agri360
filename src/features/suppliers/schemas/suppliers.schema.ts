import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  company: z.string().max(160).optional().or(z.literal('')),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  country: z.string().max(120).optional().or(z.literal('')),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
