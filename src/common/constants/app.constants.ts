import { env } from '@common/config';

export const APP_NAME = env.appName;
export const APP_VERSION = env.appVersion;

export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  UNAUTHORIZED: '/403',
  NOT_FOUND: '/404',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
export const DEBOUNCE_MS = 350;
export const TOAST_DURATION_MS = 4000;
