export const QUOTATIONS_QUERY_KEY = 'quotations' as const;

export const QUOTATIONS_PERMISSIONS = {
  VIEW: 'quotations:view',
  CREATE: 'quotations:create',
  UPDATE: 'quotations:update',
  DELETE: 'quotations:delete',
  EXPORT: 'quotations:export',
} as const;

export type QuotationPermission =
  (typeof QUOTATIONS_PERMISSIONS)[keyof typeof QUOTATIONS_PERMISSIONS];

export const QUOTATIONS_PAGE_SIZE = 10;
