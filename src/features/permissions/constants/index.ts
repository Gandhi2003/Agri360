export const PERMISSIONS_QUERY_KEY = 'permissions' as const;

export const PERMISSIONS_PERMISSIONS = {
  VIEW: 'permissions:view',
  CREATE: 'permissions:create',
  UPDATE: 'permissions:update',
  DELETE: 'permissions:delete',
  EXPORT: 'permissions:export',
} as const;

export type PermissionPermission =
  (typeof PERMISSIONS_PERMISSIONS)[keyof typeof PERMISSIONS_PERMISSIONS];

export const PERMISSIONS_PAGE_SIZE = 10;
