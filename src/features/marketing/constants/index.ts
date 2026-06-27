/** TanStack Query root key for the Marketing feature. */
export const MARKETING_QUERY_KEY = 'marketing' as const;

/** RBAC permission identifiers for Marketing. */
export const MARKETING_PERMISSIONS = {
  VIEW: 'marketing:view',
  CREATE: 'marketing:create',
  UPDATE: 'marketing:update',
  DELETE: 'marketing:delete',
  EXPORT: 'marketing:export',
} as const;

export type MarketingPermission =
  (typeof MARKETING_PERMISSIONS)[keyof typeof MARKETING_PERMISSIONS];

/** Default page size for Marketing tables. */
export const MARKETING_PAGE_SIZE = 10;
