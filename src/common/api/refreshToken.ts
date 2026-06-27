import axios from 'axios';
import { env } from '@common/config';
import type { AuthTokens } from '@common/types';
import { tokenStore } from './token';

/**
 * Single-flight refresh: concurrent 401s share ONE refresh request so we don't
 * stampede the auth endpoint. Returns the new access token, or null on failure.
 */
let inFlight: Promise<string | null> | null = null;

export const refreshAccessToken = (): Promise<string | null> => {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const refreshToken = tokenStore.getRefreshToken();
    if (!refreshToken) return null;
    try {
      // Use a clean axios call (not the intercepted instance) to avoid recursion.
      const { data } = await axios.post<AuthTokens>(
        `${env.apiBaseUrl}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );
      tokenStore.setTokens(data.accessToken, data.refreshToken);
      return data.accessToken;
    } catch {
      tokenStore.clear();
      return null;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};
