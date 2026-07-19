export const INVENTORY_QUERY_KEY = 'inventory' as const;

export const INVENTORY_PERMISSIONS = {
  VIEW: 'inventory:view',
  CREATE: 'inventory:create',
  UPDATE: 'inventory:update',
  DELETE: 'inventory:delete',
  EXPORT: 'inventory:export',
} as const;

export type InventoryPermission =
  (typeof INVENTORY_PERMISSIONS)[keyof typeof INVENTORY_PERMISSIONS];

export const INVENTORY_PAGE_SIZE = 10;
