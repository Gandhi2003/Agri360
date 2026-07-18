import axios from 'axios';
import { env } from '@common/config';
import { tokenStore } from './token';

/** Backend envelope for the refresh endpoint (snake_case tokens). */
interface RefreshEnvelope {
  data: { access_token: string; refresh_token: string };
}

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
      // Because it skips the interceptor, we unwrap the envelope ourselves.
      const { data: envelope } = await axios.post<RefreshEnvelope>(
        `${env.apiBaseUrl}/auth/refresh`,
        { refresh_token: refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const { access_token, refresh_token } = envelope.data;
      tokenStore.setTokens(access_token, refresh_token);
      return access_token;
    } catch {
      tokenStore.clear();
      return null;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};
