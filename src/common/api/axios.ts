import axios from 'axios';
import { env } from '@common/config';

/**
 * Bare axios instance. Interceptors are attached separately (see interceptor.ts)
 * to keep instance creation free of cross-module dependencies.
 */
export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
