/** TanStack Query root key for the Categories feature. */
export const CATEGORIES_QUERY_KEY = 'categories' as const;

/** RBAC permission identifiers for Categories. */
export const CATEGORIES_PERMISSIONS = {
  VIEW: 'categories:view',
  CREATE: 'categories:create',
  UPDATE: 'categories:update',
  DELETE: 'categories:delete',
  EXPORT: 'categories:export',
} as const;

export type CategoryPermission =
  (typeof CATEGORIES_PERMISSIONS)[keyof typeof CATEGORIES_PERMISSIONS];

/** Default page size for Categories tables. */
export const CATEGORIES_PAGE_SIZE = 10;
