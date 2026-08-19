import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, required, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-xs font-bold text-[#1d252db3]">
            {label}
            {required && <span className="text-danger"> *</span>}
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
            required={required}
            className={cn(
              'focus-ring h-9.5 px-3 py-2 w-full font-medium rounded-md border border-gray5 bg-card text-sm text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed no-spinner',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              !error ? ' border-gray1' : 'border-danger focus-visible:border-danger',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </span>
          )}
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
