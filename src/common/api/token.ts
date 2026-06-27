import { STORAGE_KEYS } from '@common/constants';
import { storage } from '@common/helpers';

/**
 * Token storage abstraction. Centralizes where/how JWTs are persisted so the
 * strategy (localStorage today, httpOnly cookie tomorrow) can change in one place.
 */
export const tokenStore = {
  getAccessToken: (): string | null => storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: (): string | null => storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN),

  setTokens: (accessToken: string, refreshToken: string): void => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  clear: (): void => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  },

  /** Decode a JWT payload without verifying the signature (client display only). */
  decode: <T = Record<string, unknown>>(token: string): T | null => {
    try {
      const [, payload] = token.split('.');
      return JSON.parse(atob(payload)) as T;
    } catch {
      return null;
    }
  },

  /** True if the access token is expired (or unparsable). */
  isExpired: (token: string | null): boolean => {
    if (!token) return true;
    const payload = tokenStore.decode<{ exp?: number }>(token);
    if (!payload?.exp) return true;
    return Date.now() >= payload.exp * 1000;
  },
};
