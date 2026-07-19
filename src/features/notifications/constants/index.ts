export const NOTIFICATIONS_QUERY_KEY = 'notifications' as const;

export const NOTIFICATIONS_PERMISSIONS = {
  VIEW: 'notifications:view',
  CREATE: 'notifications:create',
  UPDATE: 'notifications:update',
  DELETE: 'notifications:delete',
  EXPORT: 'notifications:export',
} as const;

export type NotificationPermission =
  (typeof NOTIFICATIONS_PERMISSIONS)[keyof typeof NOTIFICATIONS_PERMISSIONS];

export const NOTIFICATIONS_PAGE_SIZE = 10;
