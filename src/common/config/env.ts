/**
 * Centralized, type-safe access to environment variables.
 * Read env vars ONLY through this module — never via `import.meta.env` directly.
 */

const toBool = (value: string | undefined, fallback = false): boolean =>
  value == null ? fallback : value === 'true' || value === '1';

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  apiTimeout: toNumber(import.meta.env.VITE_API_TIMEOUT, 30_000),
  appName: import.meta.env.VITE_APP_NAME ?? 'Agri360 CRM',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '0.0.0',
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  enableMockApi: toBool(import.meta.env.VITE_ENABLE_MOCK_API),
  enableDevtools: toBool(import.meta.env.VITE_ENABLE_DEVTOOLS),
  authStorageKey: import.meta.env.VITE_AUTH_STORAGE_KEY ?? 'agri360.auth',
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
} as const;

export type Env = typeof env;
