import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/cn';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

/** Thin wrapper over the native date input, themed to match the design system. */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const dateId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={dateId} className="mb-2 block text-xs font-bold text-[#1d252db3]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={dateId}
          type="date"
          className={cn(
            'focus-ring h-10 w-full rounded-md border border-gray5 bg-card px-3 text-sm text-foreground disabled:opacity-50',
            error && 'border-danger focus-visible:border-danger',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
