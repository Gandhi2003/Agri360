import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/cn';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id ?? props.name;
    return (
      <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'focus-ring size-4 rounded border border-gray text-primary accent-primary',
            className,
          )}
          {...props}
        />
        {label && <span className="text-foreground">{label}</span>}
        {error && <span className="text-xs text-danger">{error}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
