import { apiClient, tokenStore } from '@common/api';
import {
  Role,
  type AuthUser,
  type ForgotPasswordPayload,
  type LoginPayload,
  type LoginResponse,
  type Permission,
  type ResetPasswordPayload,
} from '@common/types';
import { AUTH_ENDPOINTS } from '../constants';
import type { TokenResponse } from '../types';

const ROLE_VALUES = new Set<string>(Object.values(Role));

const pick = (o: Record<string, unknown>, ...keys: string[]): unknown => {
  for (const key of keys) {
    if (o[key] != null) return o[key];
  }
  return undefined;
};

const toRole = (value: unknown): Role | null => {
  const raw =
    typeof value === 'string'
      ? value
      : value && typeof value === 'object'
        ? pick(value as Record<string, unknown>, 'code', 'name', 'slug', 'role')
        : null;
  const key = typeof raw === 'string' ? raw.toLowerCase() : '';
  return ROLE_VALUES.has(key) ? (key as Role) : null;
};

const toRoles = (raw: unknown): Role[] => {
  const list = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  return list.map(toRole).filter((r): r is Role => r !== null);
};

const toPermissions = (raw: unknown): Permission[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) =>
      typeof p === 'string'
        ? p
        : typeof p === 'number'
          ? String(p)
          : p && typeof p === 'object'
            ? pick(p as Record<string, unknown>, 'code', 'name')
            : null,
    )
    .filter((p): p is Permission => typeof p === 'string');
};

const splitName = (u: Record<string, unknown>): { firstName: string; lastName: string } => {
  const first = pick(u, 'firstName', 'first_name', 'given_name');
  const last = pick(u, 'lastName', 'last_name', 'family_name');
  if (typeof first === 'string' || typeof last === 'string') {
    return { firstName: String(first ?? ''), lastName: String(last ?? '') };
  }
  const full = pick(u, 'fullName', 'full_name', 'name', 'display_name');
  if (typeof full === 'string' && full.trim()) {
    const [head, ...rest] = full.trim().split(/\s+/);
    return { firstName: head, lastName: rest.join(' ') };
  }
  return { firstName: '', lastName: '' };
};

const normalizeUser = (raw: unknown): AuthUser => {
  const u = (raw ?? {}) as Record<string, unknown>;
  const avatarUrl = pick(u, 'avatarUrl', 'avatar_url', 'avatar');

  const roles = toRoles(pick(u, 'roles', 'role', 'user_roles'));
  const isSuperuser = Boolean(pick(u, 'isSuperuser', 'is_superuser', 'isSuperUser'));
  if (isSuperuser && !roles.includes(Role.SuperAdmin)) {
    roles.push(Role.SuperAdmin);
  }

  return {
    id: String(pick(u, 'id', 'user_id', 'userId') ?? ''),
    email: String(pick(u, 'email') ?? ''),
    ...splitName(u),
    avatarUrl: typeof avatarUrl === 'string' ? avatarUrl : undefined,
    roles,
    permissions: toPermissions(pick(u, 'permissions', 'perms')),
    isActive: Boolean(pick(u, 'isActive', 'is_active') ?? true),
    createdAt: String(pick(u, 'createdAt', 'created_at') ?? ''),
    updatedAt: String(pick(u, 'updatedAt', 'updated_at') ?? ''),
  };
};

const liveAuthApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { access_token, refresh_token, expires_in } = await apiClient.post<TokenResponse>(
      AUTH_ENDPOINTS.LOGIN,
      payload,
    );
    const tokens = {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);
    const user = normalizeUser(await apiClient.get<unknown>(AUTH_ENDPOINTS.ME));
    return { user, tokens };
  },

  logout: () => apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT),

  me: async (): Promise<AuthUser> => normalizeUser(await apiClient.get<unknown>(AUTH_ENDPOINTS.ME)),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<{ message: string }>(AUTH_ENDPOINTS.FORGOT_PASSWORD, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<{ message: string }>(AUTH_ENDPOINTS.RESET_PASSWORD, payload),
};

export const authApi = liveAuthApi;
