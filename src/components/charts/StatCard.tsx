import type { LucideIcon } from 'lucide-react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@lib/cn';
import { Card } from '@components/ui/Card';

type StatCardAccent = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  /** Percentage delta vs. previous period. */
  trend?: number;
  accent?: StatCardAccent;
  /** Overrides the default single-hue top bar with custom gradient utility classes. */
  barGradient?: string;
  /** Overrides the default accent-tinted card background. */
  cardBg?: string;
  /** Overrides the default accent-colored icon badge background. */
  iconBg?: string;
  className?: string;
}

const ACCENT_COLOR: Record<StatCardAccent, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

const ACCENT_BAR: Record<StatCardAccent, string> = {
  primary: 'bg-gradient-to-r from-primary via-primary/70 to-primary/20',
  success: 'bg-gradient-to-r from-success via-success/70 to-success/20',
  warning: 'bg-gradient-to-r from-warning via-warning/70 to-warning/20',
  danger: 'bg-gradient-to-r from-danger via-danger/70 to-danger/20',
  info: 'bg-gradient-to-r from-info via-info/70 to-info/20',
};

const ACCENT_BG: Record<StatCardAccent, string> = {
  primary: 'bg-primary/5',
  success: 'bg-success/5',
  warning: 'bg-warning/5',
  danger: 'bg-danger/5',
  info: 'bg-info/5',
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = 'primary',
  barGradient,
  cardBg,
  iconBg,
  className,
}: StatCardProps) {
  const positive = (trend ?? 0) >= 0;
  return (
    <Card className={cn('relative overflow-hidden p-4', cardBg ?? ACCENT_BG[accent], className)}>
      <span
        className={cn('absolute inset-x-0 top-0 h-1', barGradient ?? ACCENT_BAR[accent])}
        aria-hidden
      />
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="text-2xl max-lg:text-xl  font-extrabold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <span
          className={cn(
            'flex size-10 items-center justify-center rounded-full text-white shadow-sm',
            iconBg ?? ACCENT_COLOR[accent],
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 ',
              positive ? 'text-success' : 'text-danger',
            )}
          >
            {positive ? <ArrowUp className="size-2.5" /> : <ArrowDown className="size-2.5" />}
            <span className=" font-extrabold">
              {positive ? '+' : '-'}
              {Math.abs(trend)}%
            </span>
          </span>
          <span className=" font-bold text-muted-foreground">vs last month</span>
        </div>
      )}
    </Card>
  );
}
