import { useAuthStore } from '@app/store';

/**
 * Read-only auth accessor. Mutations (login/logout) live in the
 * `authentication` feature; this exposes session state to any component.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitializing = useAuthStore((s) => s.isInitializing);
  return { user, isAuthenticated, isInitializing };
}
