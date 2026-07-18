import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'focus:ring-0 h-9.5 px-3 py-2 w-full font-medium rounded-md border border-gray5 bg-card text-sm text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed no-spinner',
              leftIcon && 'pl-9',
              !error
                ? ' border-gray1 focus:border-green'
                : 'border-danger focus-visible:ring-danger',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs text-danger">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
