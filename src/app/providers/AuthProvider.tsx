import { useEffect, type ReactNode } from 'react';
import { tokenStore } from '@common/api';
import { useAuthStore } from '@app/store';

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
