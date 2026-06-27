import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ROUTES } from '@common/constants';
import { axiosInstance } from './axios';
import { refreshAccessToken } from './refreshToken';
import { tokenStore } from './token';

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Attach request/response interceptors:
 *  - Request: inject Bearer access token.
 *  - Response: on 401, attempt a single token refresh and replay the request;
 *    if refresh fails, clear session and bounce to login.
 */
export const setupInterceptors = (): void => {
  axiosInstance.interceptors.request.use((config) => {
    const token = tokenStore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as RetriableConfig | undefined;
      const status = error.response?.status;

      if (status === 401 && original && !original._retry) {
        original._retry = true;
        const newToken = await refreshAccessToken();
        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(original);
        }
        // Refresh failed → force re-authentication.
        tokenStore.clear();
        if (window.location.pathname !== ROUTES.LOGIN) {
          window.location.assign(ROUTES.LOGIN);
        }
      }

      return Promise.reject(error);
    },
  );
};
