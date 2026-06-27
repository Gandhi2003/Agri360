/** TanStack Query root key for the Supplier Management feature. */
export const SUPPLIERS_QUERY_KEY = 'suppliers' as const;

/** RBAC permission identifiers for Supplier Management. */
export const SUPPLIERS_PERMISSIONS = {
  VIEW: 'suppliers:view',
  CREATE: 'suppliers:create',
  UPDATE: 'suppliers:update',
  DELETE: 'suppliers:delete',
  EXPORT: 'suppliers:export',
} as const;

export type SupplierPermission = (typeof SUPPLIERS_PERMISSIONS)[keyof typeof SUPPLIERS_PERMISSIONS];

/** Default page size for Supplier Management tables. */
export const SUPPLIERS_PAGE_SIZE = 10;
