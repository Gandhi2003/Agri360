/** TanStack Query root key for the Settings feature. */
export const SETTINGS_QUERY_KEY = 'settings' as const;

/** RBAC permission identifiers for Settings. */
export const SETTINGS_PERMISSIONS = {
  VIEW: 'settings:view',
  CREATE: 'settings:create',
  UPDATE: 'settings:update',
  DELETE: 'settings:delete',
  EXPORT: 'settings:export',
} as const;

export type SettingPermission = (typeof SETTINGS_PERMISSIONS)[keyof typeof SETTINGS_PERMISSIONS];

/** Default page size for Settings tables. */
export const SETTINGS_PAGE_SIZE = 10;
