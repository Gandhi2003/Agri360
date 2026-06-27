/** TanStack Query root key for the Crop Management feature. */
export const CROP_QUERY_KEY = 'crop' as const;

/** RBAC permission identifiers for Crop Management. */
export const CROP_PERMISSIONS = {
  VIEW: 'crop:view',
  CREATE: 'crop:create',
  UPDATE: 'crop:update',
  DELETE: 'crop:delete',
  EXPORT: 'crop:export',
} as const;

export type CropPermission = (typeof CROP_PERMISSIONS)[keyof typeof CROP_PERMISSIONS];

/** Default page size for Crop Management tables. */
export const CROP_PAGE_SIZE = 10;
