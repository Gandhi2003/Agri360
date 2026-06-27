/** TanStack Query root key for the Dealer Management feature. */
export const DEALERS_QUERY_KEY = 'dealers' as const;

/** RBAC permission identifiers for Dealer Management. */
export const DEALERS_PERMISSIONS = {
  VIEW: 'dealers:view',
  CREATE: 'dealers:create',
  UPDATE: 'dealers:update',
  DELETE: 'dealers:delete',
  EXPORT: 'dealers:export',
} as const;

export type DealerPermission = (typeof DEALERS_PERMISSIONS)[keyof typeof DEALERS_PERMISSIONS];

/** Default page size for Dealer Management tables. */
export const DEALERS_PAGE_SIZE = 10;
