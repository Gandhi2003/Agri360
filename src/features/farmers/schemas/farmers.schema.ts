import { z } from 'zod';

export const farmerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  phone: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  village: z.string().max(120).optional().or(z.literal('')),
  district: z.string().max(120).optional().or(z.literal('')),
  state: z.string().max(120).optional().or(z.literal('')),
  land_size_acres: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : val),
    z.coerce.number().nonnegative('Must be 0 or more').optional(),
  ),
  primary_crop: z.string().max(120).optional().or(z.literal('')),
});

export type FarmerFormValues = z.infer<typeof farmerSchema>;
