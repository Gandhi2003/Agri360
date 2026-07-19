import { z } from 'zod';
import { InvoiceStatus } from '../types';

export const invoiceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(InvoiceStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
