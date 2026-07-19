export const PURCHASE_QUERY_KEY = 'purchase' as const;

export const PURCHASE_PERMISSIONS = {
  VIEW: 'purchase:view',
  CREATE: 'purchase:create',
  UPDATE: 'purchase:update',
  DELETE: 'purchase:delete',
  EXPORT: 'purchase:export',
} as const;

export type PurchasePermission = (typeof PURCHASE_PERMISSIONS)[keyof typeof PURCHASE_PERMISSIONS];

export const PURCHASE_PAGE_SIZE = 10;
