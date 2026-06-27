import { Loader2 } from 'lucide-react';
import { cn } from '@lib/cn';

interface SpinnerProps {
  className?: string;
  size?: number;
}

export function Spinner({ className, size = 20 }: SpinnerProps) {
  return <Loader2 className={cn('animate-spin text-muted-foreground', className)} size={size} />;
}

/** Full-area centered loader for route/data suspense. */
export function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-3 text-muted-foreground">
      <Spinner size={28} />
      <span className="text-sm">{label}</span>
    </div>
  );
}
