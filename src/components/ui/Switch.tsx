import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    const switchId = id ?? props.name;
    return (
      <label htmlFor={switchId} className="flex cursor-pointer items-center gap-2.5 text-sm">
        <span className="relative inline-flex">
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            className={cn('peer sr-only', className)}
            {...props}
          />
          <span className="h-5 w-9 rounded-full bg-input transition-colors peer-checked:bg-primary" />
          <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
        </span>
        {label && <span className="text-foreground">{label}</span>}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
