/** TanStack Query root key for the Stock feature. */
export const STOCK_QUERY_KEY = 'stock' as const;

/** RBAC permission identifiers for Stock. */
export const STOCK_PERMISSIONS = {
  VIEW: 'stock:view',
  CREATE: 'stock:create',
  UPDATE: 'stock:update',
  DELETE: 'stock:delete',
  EXPORT: 'stock:export',
} as const;

export type StockPermission = (typeof STOCK_PERMISSIONS)[keyof typeof STOCK_PERMISSIONS];

/** Default page size for Stock tables. */
export const STOCK_PAGE_SIZE = 10;
