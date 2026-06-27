/** TanStack Query root key for the Farmer Management feature. */
export const FARMERS_QUERY_KEY = 'farmers' as const;

/** RBAC permission identifiers for Farmer Management. */
export const FARMERS_PERMISSIONS = {
  VIEW: 'farmers:view',
  CREATE: 'farmers:create',
  UPDATE: 'farmers:update',
  DELETE: 'farmers:delete',
  EXPORT: 'farmers:export',
} as const;

export type FarmerPermission = (typeof FARMERS_PERMISSIONS)[keyof typeof FARMERS_PERMISSIONS];

/** Default page size for Farmer Management tables. */
export const FARMERS_PAGE_SIZE = 10;
