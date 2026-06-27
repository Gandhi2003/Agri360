import { z } from 'zod';
import { ReportStatus } from '../types';

/** Zod schema mirroring Create/Update Report payloads. */
export const reportSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  code: z.string().min(1, 'Code is required').max(40),
  status: z.nativeEnum(ReportStatus),
  description: z.string().max(500).optional().or(z.literal('')),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
