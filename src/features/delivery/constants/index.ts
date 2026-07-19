export const DELIVERY_QUERY_KEY = 'delivery' as const;

export const DELIVERY_PERMISSIONS = {
  VIEW: 'delivery:view',
  CREATE: 'delivery:create',
  UPDATE: 'delivery:update',
  DELETE: 'delivery:delete',
  EXPORT: 'delivery:export',
} as const;

export type DeliveryPermission = (typeof DELIVERY_PERMISSIONS)[keyof typeof DELIVERY_PERMISSIONS];

export const DELIVERY_PAGE_SIZE = 10;
