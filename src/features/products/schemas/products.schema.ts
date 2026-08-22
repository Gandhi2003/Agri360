import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(160),
  sku: z.string().min(1, 'SKU is required').max(60),
  description: z.string().max(500).optional().or(z.literal('')),
  unit: z.string().min(1, 'Unit is required').max(40),
  price: z.string().min(1, 'Price is required'),
  cost_price: z.string().min(1, 'Cost price is required'),
  stock_quantity: z.coerce.number().int('Must be a whole number').nonnegative('Must be 0 or more'),
  reorder_level: z.coerce.number().int('Must be a whole number').nonnegative('Must be 0 or more'),
  is_active: z.boolean(),
  category_id: z.coerce.number().int().positive('Category is required'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
