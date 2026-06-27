import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@lib/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const config: Record<AlertVariant, { icon: typeof Info; styles: string }> = {
  info: { icon: Info, styles: 'border-info/30 bg-info/10 text-info' },
  success: { icon: CheckCircle2, styles: 'border-success/30 bg-success/10 text-success' },
  warning: { icon: AlertCircle, styles: 'border-warning/30 bg-warning/10 text-warning' },
  danger: { icon: XCircle, styles: 'border-danger/30 bg-danger/10 text-danger' },
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const { icon: Icon, styles } = config[variant];
  return (
    <div className={cn('flex gap-3 rounded-lg border p-4 text-sm', styles, className)}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-0.5">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className="text-foreground/80">{children}</div>}
      </div>
    </div>
  );
}
