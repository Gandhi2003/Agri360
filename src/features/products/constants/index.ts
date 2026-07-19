export const PRODUCTS_QUERY_KEY = 'products' as const;

export const PRODUCTS_PERMISSIONS = {
  VIEW: 'products:view',
  CREATE: 'products:create',
  UPDATE: 'products:update',
  DELETE: 'products:delete',
  EXPORT: 'products:export',
} as const;

export type ProductPermission = (typeof PRODUCTS_PERMISSIONS)[keyof typeof PRODUCTS_PERMISSIONS];

export const PRODUCTS_PAGE_SIZE = 10;
