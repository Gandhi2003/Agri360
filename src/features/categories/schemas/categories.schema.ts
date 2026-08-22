import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  description: z.string().max(500).optional().or(z.literal('')),
  is_active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
