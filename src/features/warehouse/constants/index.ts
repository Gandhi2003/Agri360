export const WAREHOUSE_QUERY_KEY = 'warehouse' as const;

export const WAREHOUSE_PERMISSIONS = {
  VIEW: 'warehouse:view',
  CREATE: 'warehouse:create',
  UPDATE: 'warehouse:update',
  DELETE: 'warehouse:delete',
  EXPORT: 'warehouse:export',
} as const;

export type WarehousePermission =
  (typeof WAREHOUSE_PERMISSIONS)[keyof typeof WAREHOUSE_PERMISSIONS];

export const WAREHOUSE_PAGE_SIZE = 10;
