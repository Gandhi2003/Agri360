export const ROLES_QUERY_KEY = 'roles' as const;

export const ROLES_PERMISSIONS = {
  VIEW: 'roles:view',
  CREATE: 'roles:create',
  UPDATE: 'roles:update',
  DELETE: 'roles:delete',
  EXPORT: 'roles:export',
} as const;

export type RolePermission = (typeof ROLES_PERMISSIONS)[keyof typeof ROLES_PERMISSIONS];

export const ROLES_PAGE_SIZE = 10;
