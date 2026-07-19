import type { BaseEntity } from './common.types';

export enum Role {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  Manager = 'manager',
  SalesAgent = 'sales_agent',
  FieldOfficer = 'field_officer',
  Viewer = 'viewer',
}

export type Permission = string;

export interface AuthUser extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roles: Role[];
  permissions: Permission[];
  isActive: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}
