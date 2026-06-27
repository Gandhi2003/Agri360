/** TanStack Query root key for the Delivery feature. */
export const DELIVERY_QUERY_KEY = 'delivery' as const;

/** RBAC permission identifiers for Delivery. */
export const DELIVERY_PERMISSIONS = {
  VIEW: 'delivery:view',
  CREATE: 'delivery:create',
  UPDATE: 'delivery:update',
  DELETE: 'delivery:delete',
  EXPORT: 'delivery:export',
} as const;

export type DeliveryPermission = (typeof DELIVERY_PERMISSIONS)[keyof typeof DELIVERY_PERMISSIONS];

/** Default page size for Delivery tables. */
export const DELIVERY_PAGE_SIZE = 10;
