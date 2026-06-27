/** TanStack Query root key for the Warehouse feature. */
export const WAREHOUSE_QUERY_KEY = 'warehouse' as const;

/** RBAC permission identifiers for Warehouse. */
export const WAREHOUSE_PERMISSIONS = {
  VIEW: 'warehouse:view',
  CREATE: 'warehouse:create',
  UPDATE: 'warehouse:update',
  DELETE: 'warehouse:delete',
  EXPORT: 'warehouse:export',
} as const;

export type WarehousePermission =
  (typeof WAREHOUSE_PERMISSIONS)[keyof typeof WAREHOUSE_PERMISSIONS];

/** Default page size for Warehouse tables. */
export const WAREHOUSE_PAGE_SIZE = 10;
