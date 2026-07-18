import type { ReactNode } from 'react';
import { ErrorBoundary } from '@components/shared';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';
import { ToastProvider } from './ToastProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          {children}
          <ToastProvider />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
