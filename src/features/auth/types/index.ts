export type {
  AuthTokens,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from '@common/types';

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
