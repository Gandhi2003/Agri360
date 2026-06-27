/** TanStack Query root key for the Quotations feature. */
export const QUOTATIONS_QUERY_KEY = 'quotations' as const;

/** RBAC permission identifiers for Quotations. */
export const QUOTATIONS_PERMISSIONS = {
  VIEW: 'quotations:view',
  CREATE: 'quotations:create',
  UPDATE: 'quotations:update',
  DELETE: 'quotations:delete',
  EXPORT: 'quotations:export',
} as const;

export type QuotationPermission =
  (typeof QUOTATIONS_PERMISSIONS)[keyof typeof QUOTATIONS_PERMISSIONS];

/** Default page size for Quotations tables. */
export const QUOTATIONS_PAGE_SIZE = 10;
