/** TanStack Query root key for the User Management feature. */
export const USERS_QUERY_KEY = 'users' as const;

/** RBAC permission identifiers for User Management. */
export const USERS_PERMISSIONS = {
  VIEW: 'users:view',
  CREATE: 'users:create',
  UPDATE: 'users:update',
  DELETE: 'users:delete',
  EXPORT: 'users:export',
} as const;

export type UserPermission = (typeof USERS_PERMISSIONS)[keyof typeof USERS_PERMISSIONS];

/** Default page size for User Management tables. */
export const USERS_PAGE_SIZE = 10;
