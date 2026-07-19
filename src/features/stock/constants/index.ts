export const STOCK_QUERY_KEY = 'stock' as const;

export const STOCK_PERMISSIONS = {
  VIEW: 'stock:view',
  CREATE: 'stock:create',
  UPDATE: 'stock:update',
  DELETE: 'stock:delete',
  EXPORT: 'stock:export',
} as const;

export type StockPermission = (typeof STOCK_PERMISSIONS)[keyof typeof STOCK_PERMISSIONS];

export const STOCK_PAGE_SIZE = 10;
