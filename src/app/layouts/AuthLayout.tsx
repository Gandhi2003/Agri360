import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Heart, MessageCircle, Sprout, Star, ThumbsUp } from 'lucide-react';
import { APP_NAME } from '@common/constants';
import { Loader } from '@components/ui/Spinner';

/** Decorative illustration collage for the brand panel. */
function BrandIllustration() {
  return (
    <div className="relative mx-auto size-64">
      {/* Central "app window" mock */}
      <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/95 p-4 shadow-2xl">
        <div className="mb-3 flex gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-current" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-brand-200" />
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="h-2 w-5/6 rounded-full bg-slate-200" />
          <div className="mt-3 h-6 w-24 rounded-md bg-brand-500" />
        </div>
      </div>

      {/* Floating badges */}
      <span className="absolute -left-2 top-6 grid size-11 place-items-center rounded-xl bg-white text-rose-500 shadow-lg">
        <Heart className="size-5 fill-current" />
      </span>
      <span className="absolute right-0 top-0 grid size-11 place-items-center rounded-xl bg-white text-brand-600 shadow-lg">
        <MessageCircle className="size-5" />
      </span>
      <span className="absolute -right-2 bottom-8 grid size-11 place-items-center rounded-xl bg-white text-emerald-500 shadow-lg">
        <ThumbsUp className="size-5" />
      </span>
    </div>
  );
}

/** Split-screen shell for authentication pages: form left, brand panel right. */
export function AuthLayout() {
  return (
    <div
      className="grid min-h-full lg:grid-cols-2"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom right, rgb(var(--brand-500)), rgb(var(--brand-700)))',
        backgroundSize: '22px 22px, 100% 100%',
      }}
    >
      {/* Form panel */}
      <div className="relative z-10 flex items-center justify-center bg-background p-6 sm:p-10 lg:rounded-r-[2.5rem] lg:shadow-2xl">
        <div className="w-full max-w-102.5">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>

      {/* Brand panel — transparent so the shared gradient shows through seamlessly */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden p-12 text-center text-white lg:flex">
        <div className="absolute left-8 top-8 flex items-center gap-2 text-white/90">
          <span className="grid size-9 place-items-center rounded-lg bg-white/15">
            <Sprout className="size-5" />
          </span>
          <span className="font-semibold">{APP_NAME}</span>
        </div>

        <BrandIllustration />

        <h2 className="mt-10 text-3xl font-bold">Hello, Friend!</h2>
        <p className="mt-3 max-w-sm text-white/80">
          Manage farmers, dealers, inventory, sales and field operations from a single platform.
        </p>
      </div>
    </div>
  );
}
