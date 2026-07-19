export const DEALERS_QUERY_KEY = 'dealers' as const;

export const DEALERS_PERMISSIONS = {
  VIEW: 'dealers:view',
  CREATE: 'dealers:create',
  UPDATE: 'dealers:update',
  DELETE: 'dealers:delete',
  EXPORT: 'dealers:export',
} as const;

export type DealerPermission = (typeof DEALERS_PERMISSIONS)[keyof typeof DEALERS_PERMISSIONS];

export const DEALERS_PAGE_SIZE = 10;
