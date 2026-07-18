import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
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
    (response) => {
      // The backend wraps every payload in `{ success, data, error, meta }`.
      // Unwrap to `data` so feature APIs receive their typed payload directly.
      // For paginated responses, preserve `meta` (normalizing snake_case →
      // camelCase) so list views keep their pagination info.
      const body = response.data as
        | {
            success?: boolean;
            data?: unknown;
            error?: { message?: string };
            meta?: {
              page?: number;
              page_size?: number;
              total_items?: number;
              total_pages?: number;
            };
          }
        | undefined;
      if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
        if (body.success === false) {
          return Promise.reject(
            new AxiosError(
              body.error?.message ?? 'Request failed',
              undefined,
              response.config,
              response.request,
              response,
            ),
          );
        }
        const meta = body.meta;
        if (meta && meta.total_items != null) {
          response.data = {
            data: body.data,
            meta: {
              page: meta.page ?? 1,
              pageSize: meta.page_size ?? 0,
              total: meta.total_items ?? 0,
              totalPages: meta.total_pages ?? 0,
            },
          };
        } else {
          response.data = body.data;
        }
      }
      return response;
    },
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
