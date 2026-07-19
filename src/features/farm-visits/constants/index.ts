export const FARM_VISITS_QUERY_KEY = 'farm-visits' as const;

export const FARM_VISITS_PERMISSIONS = {
  VIEW: 'farm-visits:view',
  CREATE: 'farm-visits:create',
  UPDATE: 'farm-visits:update',
  DELETE: 'farm-visits:delete',
  EXPORT: 'farm-visits:export',
} as const;

export type FarmVisitPermission =
  (typeof FARM_VISITS_PERMISSIONS)[keyof typeof FARM_VISITS_PERMISSIONS];

export const FARM_VISITS_PAGE_SIZE = 10;
