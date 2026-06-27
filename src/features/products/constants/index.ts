/** TanStack Query root key for the Products feature. */
export const PRODUCTS_QUERY_KEY = 'products' as const;

/** RBAC permission identifiers for Products. */
export const PRODUCTS_PERMISSIONS = {
  VIEW: 'products:view',
  CREATE: 'products:create',
  UPDATE: 'products:update',
  DELETE: 'products:delete',
  EXPORT: 'products:export',
} as const;

export type ProductPermission = (typeof PRODUCTS_PERMISSIONS)[keyof typeof PRODUCTS_PERMISSIONS];

/** Default page size for Products tables. */
export const PRODUCTS_PAGE_SIZE = 10;
