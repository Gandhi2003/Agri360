/** TanStack Query root key for the Sales feature. */
export const SALES_QUERY_KEY = 'sales' as const;

/** RBAC permission identifiers for Sales. */
export const SALES_PERMISSIONS = {
  VIEW: 'sales:view',
  CREATE: 'sales:create',
  UPDATE: 'sales:update',
  DELETE: 'sales:delete',
  EXPORT: 'sales:export',
} as const;

export type SalePermission = (typeof SALES_PERMISSIONS)[keyof typeof SALES_PERMISSIONS];

/** Default page size for Sales tables. */
export const SALES_PAGE_SIZE = 10;
