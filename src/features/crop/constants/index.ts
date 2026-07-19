export const CROP_QUERY_KEY = 'crop' as const;

export const CROP_PERMISSIONS = {
  VIEW: 'crop:view',
  CREATE: 'crop:create',
  UPDATE: 'crop:update',
  DELETE: 'crop:delete',
  EXPORT: 'crop:export',
} as const;

export type CropPermission = (typeof CROP_PERMISSIONS)[keyof typeof CROP_PERMISSIONS];

export const CROP_PAGE_SIZE = 10;
