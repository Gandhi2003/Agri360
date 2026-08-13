import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { capitalize } from '@common/utils';
import { useBreadcrumbStore } from '@app/store';
import { cn } from '@lib/cn';

/** Auto-generated breadcrumb derived from the current pathname. */
export function Breadcrumb({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const labels = useBreadcrumbStore((state) => state.labels);
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}
    >
      <Link to="/dashboard" className="hover:text-foreground" aria-label="Home">
        <Home className="size-4" />
      </Link>
      {segments.map((segment, idx) => {
        const href = `/${segments.slice(0, idx + 1).join('/')}`;
        const isLast = idx === segments.length - 1;
        const label = labels[segment] ?? capitalize(segment.replace(/-/g, ' '));
        return (
          <Fragment key={href}>
            <ChevronRight className="size-3.5" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={href} className="hover:text-foreground">
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
