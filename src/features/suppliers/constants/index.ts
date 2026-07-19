export const SUPPLIERS_QUERY_KEY = 'suppliers' as const;

export const SUPPLIERS_PERMISSIONS = {
  VIEW: 'suppliers:view',
  CREATE: 'suppliers:create',
  UPDATE: 'suppliers:update',
  DELETE: 'suppliers:delete',
  EXPORT: 'suppliers:export',
} as const;

export type SupplierPermission = (typeof SUPPLIERS_PERMISSIONS)[keyof typeof SUPPLIERS_PERMISSIONS];

export const SUPPLIERS_PAGE_SIZE = 10;
