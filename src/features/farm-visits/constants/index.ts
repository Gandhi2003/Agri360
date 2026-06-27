/** TanStack Query root key for the Farm Visits feature. */
export const FARM_VISITS_QUERY_KEY = 'farm-visits' as const;

/** RBAC permission identifiers for Farm Visits. */
export const FARM_VISITS_PERMISSIONS = {
  VIEW: 'farm-visits:view',
  CREATE: 'farm-visits:create',
  UPDATE: 'farm-visits:update',
  DELETE: 'farm-visits:delete',
  EXPORT: 'farm-visits:export',
} as const;

export type FarmVisitPermission =
  (typeof FARM_VISITS_PERMISSIONS)[keyof typeof FARM_VISITS_PERMISSIONS];

/** Default page size for Farm Visits tables. */
export const FARM_VISITS_PAGE_SIZE = 10;
