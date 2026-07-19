export const FARMERS_QUERY_KEY = 'farmers' as const;

export const FARMERS_PERMISSIONS = {
  VIEW: 'farmers:view',
  CREATE: 'farmers:create',
  UPDATE: 'farmers:update',
  DELETE: 'farmers:delete',
  EXPORT: 'farmers:export',
} as const;

export type FarmerPermission = (typeof FARMERS_PERMISSIONS)[keyof typeof FARMERS_PERMISSIONS];

export const FARMERS_PAGE_SIZE = 10;
