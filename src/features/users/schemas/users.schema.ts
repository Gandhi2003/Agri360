import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().max(60).optional().or(z.literal('')),
  phoneNumber: z.string().min(1, 'Phone number is required').max(20),
  address1: z.string().max(120).optional().or(z.literal('')),
  address2: z.string().max(120).optional().or(z.literal('')),
  country: z.string().max(60).optional().or(z.literal('')),
  state: z.string().max(60).optional().or(z.literal('')),
  city: z.string().max(60).optional().or(z.literal('')),
  pincode: z.string().max(20).optional().or(z.literal('')),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  isSuperuser: z.boolean().optional(),
  roleIds: z.array(z.number()).optional(),
  image: z.instanceof(File).nullable().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const createUserSchema = userSchema
  .extend({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
