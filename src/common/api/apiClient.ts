import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';
import { setupInterceptors } from './interceptor';

// Wire interceptors once at module load.
setupInterceptors();

/**
 * Thin, typed facade over axios. Every method resolves to the parsed response
 * body typed as `<T>`. Feature API modules depend ONLY on this — never on axios
 * directly — so transport concerns stay centralized.
 */
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(url, config).then((r) => r.data),

  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<T>(url, body, config).then((r) => r.data),

  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(url, body, config).then((r) => r.data),

  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch<T>(url, body, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then((r) => r.data),
};

export type ApiClient = typeof apiClient;
