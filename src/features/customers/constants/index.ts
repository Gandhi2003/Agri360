export const CUSTOMERS_QUERY_KEY = 'customers' as const;

export const CUSTOMERS_PERMISSIONS = {
  VIEW: 'customers:view',
  CREATE: 'customers:create',
  UPDATE: 'customers:update',
  DELETE: 'customers:delete',
  EXPORT: 'customers:export',
} as const;

export type CustomerPermission = (typeof CUSTOMERS_PERMISSIONS)[keyof typeof CUSTOMERS_PERMISSIONS];

export const CUSTOMERS_PAGE_SIZE = 10;
