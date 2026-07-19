export const SETTINGS_QUERY_KEY = 'settings' as const;

export const SETTINGS_PERMISSIONS = {
  VIEW: 'settings:view',
  CREATE: 'settings:create',
  UPDATE: 'settings:update',
  DELETE: 'settings:delete',
  EXPORT: 'settings:export',
} as const;

export type SettingPermission = (typeof SETTINGS_PERMISSIONS)[keyof typeof SETTINGS_PERMISSIONS];

export const SETTINGS_PAGE_SIZE = 10;
