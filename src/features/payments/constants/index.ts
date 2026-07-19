export const PAYMENTS_QUERY_KEY = 'payments' as const;

export const PAYMENTS_PERMISSIONS = {
  VIEW: 'payments:view',
  CREATE: 'payments:create',
  UPDATE: 'payments:update',
  DELETE: 'payments:delete',
  EXPORT: 'payments:export',
} as const;

export type PaymentPermission = (typeof PAYMENTS_PERMISSIONS)[keyof typeof PAYMENTS_PERMISSIONS];

export const PAYMENTS_PAGE_SIZE = 10;
