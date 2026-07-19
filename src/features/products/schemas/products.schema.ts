import { z } from 'zod';
import { ProductStatus } from '../types';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(ProductStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type ProductFormValues = z.infer<typeof productSchema>;
