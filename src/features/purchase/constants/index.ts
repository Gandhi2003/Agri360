/** TanStack Query root key for the Purchase feature. */
export const PURCHASE_QUERY_KEY = 'purchase' as const;

/** RBAC permission identifiers for Purchase. */
export const PURCHASE_PERMISSIONS = {
  VIEW: 'purchase:view',
  CREATE: 'purchase:create',
  UPDATE: 'purchase:update',
  DELETE: 'purchase:delete',
  EXPORT: 'purchase:export',
} as const;

export type PurchasePermission = (typeof PURCHASE_PERMISSIONS)[keyof typeof PURCHASE_PERMISSIONS];

/** Default page size for Purchase tables. */
export const PURCHASE_PAGE_SIZE = 10;
