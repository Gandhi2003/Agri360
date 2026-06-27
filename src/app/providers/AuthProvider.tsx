import { useEffect, type ReactNode } from 'react';
import { tokenStore } from '@common/api';
import { useAuthStore } from '@app/store';

/**
 * Bootstraps the auth session on mount: validates the persisted token and
 * flips `isInitializing` so guards can make a final allow/deny decision.
 * In a real app this is where you'd refetch `/auth/me`.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const setInitializing = useAuthStore((s) => s.setInitializing);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    const token = tokenStore.getAccessToken();
    if (token && tokenStore.isExpired(token) && !tokenStore.getRefreshToken()) {
      clearSession();
    }
    setInitializing(false);
  }, [setInitializing, clearSession]);

  return <>{children}</>;
}
