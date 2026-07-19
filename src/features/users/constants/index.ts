export const USERS_QUERY_KEY = 'users' as const;

export const USERS_PERMISSIONS = {
  VIEW: 'users:view',
  CREATE: 'users:create',
  UPDATE: 'users:update',
  DELETE: 'users:delete',
  EXPORT: 'users:export',
} as const;

export type UserPermission = (typeof USERS_PERMISSIONS)[keyof typeof USERS_PERMISSIONS];

export const USERS_PAGE_SIZE = 10;
