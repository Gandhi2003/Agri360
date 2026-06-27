import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { APP_NAME } from '@common/constants';
import { Loader } from '@components/ui/Spinner';

/** Centered, branded shell for authentication pages. */
export function AuthLayout() {
  return (
    <div className="grid min-h-full lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-700 p-12 text-white lg:flex">
        <div className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-lg bg-white/15">
            <Sprout className="size-6" />
          </span>
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight">Grow smarter with Agri360.</h1>
          <p className="max-w-md text-white/80">
            The end-to-end agriculture CRM — manage farmers, dealers, inventory, sales and field
            operations from a single platform.
          </p>
        </div>
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Agri360. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
