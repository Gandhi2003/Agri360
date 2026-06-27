import type { BaseEntity } from './common.types';

/** Coarse-grained roles for RBAC. */
export enum Role {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  Manager = 'manager',
  SalesAgent = 'sales_agent',
  FieldOfficer = 'field_officer',
  Viewer = 'viewer',
}

/** A fine-grained permission string, e.g. `farmers:create`. */
export type Permission = string;

/** Authenticated user profile. */
export interface AuthUser extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roles: Role[];
  permissions: Permission[];
  isActive: boolean;
}

/** Token pair returned by the auth endpoints. */
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
