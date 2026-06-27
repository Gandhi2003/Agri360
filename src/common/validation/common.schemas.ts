import { z } from 'zod';

/** Reusable Zod primitives shared across feature schemas. */
export const emailSchema = z.string().min(1, 'Email is required').email('Enter a valid email');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[0-9]/, 'Include at least one number');

export const phoneSchema = z.string().regex(/^[+]?[\d\s-]{7,15}$/, 'Enter a valid phone number');

export const idSchema = z.string().min(1);

export const paginationParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
