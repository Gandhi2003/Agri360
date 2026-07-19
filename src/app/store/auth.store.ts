import { create } from 'zustand';
import { tokenStore } from '@common/api';
import { STORAGE_KEYS } from '@common/constants';
import { storage } from '@common/helpers';
import { resolvePermissions } from '@common/permissions';
import type { AuthTokens, AuthUser, Permission, Role } from '@common/types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  permissions: Set<Permission>;

  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
  setInitializing: (value: boolean) => void;
  hasRole: (role: Role) => boolean;
}

const persistedUser = storage.get<AuthUser>(STORAGE_KEYS.USER);
const initialToken = tokenStore.getAccessToken();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: persistedUser,
  isAuthenticated: Boolean(persistedUser && initialToken && !tokenStore.isExpired(initialToken)),
  isInitializing: true,
  permissions: persistedUser ? resolvePermissions(persistedUser) : new Set(),

  setSession: (user, tokens) => {
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);
    storage.set(STORAGE_KEYS.USER, user);
    set({ user, isAuthenticated: true, permissions: resolvePermissions(user) });
  },

  setUser: (user) => {
    storage.set(STORAGE_KEYS.USER, user);
    set({ user, permissions: resolvePermissions(user) });
  },

  clearSession: () => {
    tokenStore.clear();
    set({ user: null, isAuthenticated: false, permissions: new Set() });
  },

  setInitializing: (value) => set({ isInitializing: value }),

  hasRole: (role) => get().user?.roles?.includes(role) ?? false,
}));
