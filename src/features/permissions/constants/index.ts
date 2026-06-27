/** TanStack Query root key for the Permission Management feature. */
export const PERMISSIONS_QUERY_KEY = 'permissions' as const;

/** RBAC permission identifiers for Permission Management. */
export const PERMISSIONS_PERMISSIONS = {
  VIEW: 'permissions:view',
  CREATE: 'permissions:create',
  UPDATE: 'permissions:update',
  DELETE: 'permissions:delete',
  EXPORT: 'permissions:export',
} as const;

export type PermissionPermission =
  (typeof PERMISSIONS_PERMISSIONS)[keyof typeof PERMISSIONS_PERMISSIONS];

/** Default page size for Permission Management tables. */
export const PERMISSIONS_PAGE_SIZE = 10;
