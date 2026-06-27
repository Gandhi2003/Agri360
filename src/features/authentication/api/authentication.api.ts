import { apiClient } from '@common/api';
import { env } from '@common/config';
import type {
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from '@common/types';
import { AUTH_ENDPOINTS } from '../constants';
import { mockAuthApi } from './authentication.mock';

/** Real, network-backed data-access for authentication endpoints. */
const liveAuthApi = {
  login: (payload: LoginPayload) => apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload),

  logout: () => apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT),

  me: () => apiClient.get<AuthUser>(AUTH_ENDPOINTS.ME),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<{ message: string }>(AUTH_ENDPOINTS.FORGOT_PASSWORD, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<{ message: string }>(AUTH_ENDPOINTS.RESET_PASSWORD, payload),
};

/** Swaps to the dev mock when `VITE_ENABLE_MOCK_API=true`. */
export const authApi = env.enableMockApi ? mockAuthApi : liveAuthApi;
