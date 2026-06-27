/** TanStack Query root key for the Notifications feature. */
export const NOTIFICATIONS_QUERY_KEY = 'notifications' as const;

/** RBAC permission identifiers for Notifications. */
export const NOTIFICATIONS_PERMISSIONS = {
  VIEW: 'notifications:view',
  CREATE: 'notifications:create',
  UPDATE: 'notifications:update',
  DELETE: 'notifications:delete',
  EXPORT: 'notifications:export',
} as const;

export type NotificationPermission =
  (typeof NOTIFICATIONS_PERMISSIONS)[keyof typeof NOTIFICATIONS_PERMISSIONS];

/** Default page size for Notifications tables. */
export const NOTIFICATIONS_PAGE_SIZE = 10;
