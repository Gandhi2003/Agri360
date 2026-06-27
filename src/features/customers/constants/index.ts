/** TanStack Query root key for the Customer Management feature. */
export const CUSTOMERS_QUERY_KEY = 'customers' as const;

/** RBAC permission identifiers for Customer Management. */
export const CUSTOMERS_PERMISSIONS = {
  VIEW: 'customers:view',
  CREATE: 'customers:create',
  UPDATE: 'customers:update',
  DELETE: 'customers:delete',
  EXPORT: 'customers:export',
} as const;

export type CustomerPermission = (typeof CUSTOMERS_PERMISSIONS)[keyof typeof CUSTOMERS_PERMISSIONS];

/** Default page size for Customer Management tables. */
export const CUSTOMERS_PAGE_SIZE = 10;
