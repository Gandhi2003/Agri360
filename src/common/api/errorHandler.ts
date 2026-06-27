import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import type { ApiError } from '@common/types';

/** Normalize any thrown value into a consistent ApiError shape. */
export const normalizeError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      { message?: string; code?: string; errors?: Record<string, string[]> } | undefined;
    return {
      status: error.response?.status ?? 0,
      code: data?.code ?? error.code ?? 'UNKNOWN',
      message: data?.message ?? error.message ?? 'Something went wrong',
      details: data?.errors,
    };
  }
  if (error instanceof Error) {
    return { status: 0, code: 'CLIENT_ERROR', message: error.message };
  }
  return { status: 0, code: 'UNKNOWN', message: 'An unexpected error occurred' };
};

/** Map HTTP status to a user-friendly message. */
const friendlyMessage = (error: ApiError): string => {
  switch (error.status) {
    case 400:
      return error.message || 'Invalid request.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 422:
      return error.message || 'Validation failed.';
    case 429:
      return 'Too many requests. Please slow down.';
    case 500:
    case 502:
    case 503:
      return 'A server error occurred. Please try again later.';
    default:
      return error.message;
  }
};

/** Normalize + surface an error via toast. Returns the normalized error. */
export const handleApiError = (error: unknown, { silent = false } = {}): ApiError => {
  const normalized = normalizeError(error);
  // 401 is handled by the refresh flow; avoid double-toasting.
  if (!silent && normalized.status !== 401) {
    toast.error(friendlyMessage(normalized));
  }
  return normalized;
};
