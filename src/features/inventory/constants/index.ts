/** TanStack Query root key for the Inventory feature. */
export const INVENTORY_QUERY_KEY = 'inventory' as const;

/** RBAC permission identifiers for Inventory. */
export const INVENTORY_PERMISSIONS = {
  VIEW: 'inventory:view',
  CREATE: 'inventory:create',
  UPDATE: 'inventory:update',
  DELETE: 'inventory:delete',
  EXPORT: 'inventory:export',
} as const;

export type InventoryPermission =
  (typeof INVENTORY_PERMISSIONS)[keyof typeof INVENTORY_PERMISSIONS];

/** Default page size for Inventory tables. */
export const INVENTORY_PAGE_SIZE = 10;
