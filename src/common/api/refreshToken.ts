import axios from 'axios';
import { env } from '@common/config';
import { tokenStore } from './token';

interface RefreshEnvelope {
  data: { access_token: string; refresh_token: string };
}

let inFlight: Promise<string | null> | null = null;

export const refreshAccessToken = (): Promise<string | null> => {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const refreshToken = tokenStore.getRefreshToken();
    if (!refreshToken) return null;
    try {
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
