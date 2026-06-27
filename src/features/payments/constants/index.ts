/** TanStack Query root key for the Payments feature. */
export const PAYMENTS_QUERY_KEY = 'payments' as const;

/** RBAC permission identifiers for Payments. */
export const PAYMENTS_PERMISSIONS = {
  VIEW: 'payments:view',
  CREATE: 'payments:create',
  UPDATE: 'payments:update',
  DELETE: 'payments:delete',
  EXPORT: 'payments:export',
} as const;

export type PaymentPermission = (typeof PAYMENTS_PERMISSIONS)[keyof typeof PAYMENTS_PERMISSIONS];

/** Default page size for Payments tables. */
export const PAYMENTS_PAGE_SIZE = 10;
