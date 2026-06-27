import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@components/navbar/Navbar';
import { Sidebar } from '@components/sidebar/Sidebar';
import { ErrorBoundary } from '@components/shared';
import { Loader } from '@components/ui/Spinner';

/** Authenticated app chrome: sidebar + top navbar + routed content. */
export function DashboardLayout() {
  return (
    <div className="flex h-full bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6">
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
