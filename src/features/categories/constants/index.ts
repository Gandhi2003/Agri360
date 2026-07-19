export const CATEGORIES_QUERY_KEY = 'categories' as const;

export const CATEGORIES_PERMISSIONS = {
  VIEW: 'categories:view',
  CREATE: 'categories:create',
  UPDATE: 'categories:update',
  DELETE: 'categories:delete',
  EXPORT: 'categories:export',
} as const;

export type CategoryPermission =
  (typeof CATEGORIES_PERMISSIONS)[keyof typeof CATEGORIES_PERMISSIONS];

export const CATEGORIES_PAGE_SIZE = 10;
