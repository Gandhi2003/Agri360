import { env } from '@common/config';

/** Namespaced localStorage keys. */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${env.authStorageKey}.access_token`,
  REFRESH_TOKEN: `${env.authStorageKey}.refresh_token`,
  USER: `${env.authStorageKey}.user`,
  THEME: 'agri360.theme',
  SIDEBAR_COLLAPSED: 'agri360.sidebar.collapsed',
} as const;
