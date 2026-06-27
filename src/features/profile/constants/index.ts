/** TanStack Query root key for the Profile feature. */
export const PROFILE_QUERY_KEY = 'profile' as const;

/** RBAC permission identifiers for Profile. */
export const PROFILE_PERMISSIONS = {
  VIEW: 'profile:view',
  CREATE: 'profile:create',
  UPDATE: 'profile:update',
  DELETE: 'profile:delete',
  EXPORT: 'profile:export',
} as const;

export type ProfilePermission = (typeof PROFILE_PERMISSIONS)[keyof typeof PROFILE_PERMISSIONS];

/** Default page size for Profile tables. */
export const PROFILE_PAGE_SIZE = 10;
