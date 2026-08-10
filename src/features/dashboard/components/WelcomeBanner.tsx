import { Hexagon, Pencil, RotateCcw, Triangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@common/utils';

interface WelcomeBannerProps {
  name: string;
  updatedAt?: string;
}

export function WelcomeBanner({ name, updatedAt }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-950 via-brand-900 to-primary px-6 py-6 text-white">
      <Triangle
        aria-hidden
        className="pointer-events-none absolute left-[28%] top-4 size-6 -rotate-90 fill-warning/20 text-warning/70"
      />
      <Hexagon
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-2 size-10 text-info/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[24%] size-14 rounded-t-full border-4 border-brand-200/30"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[8%] size-14 rounded-t-full border-4 border-brand-50/20"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold">Welcome Back, {name}</h2>
            <Link
              to="/profile"
              aria-label="Edit profile"
              className="flex size-7 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Pencil className="size-3.5" />
            </Link>
          </div>
          <p className="mt-1 text-sm text-white/70">Have a good day at work</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-white/60">
          <RotateCcw className="size-4" />
          <span>Updated Recently on {formatDate(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
