import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/cn';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const radioId = id ?? `${props.name}-${String(props.value)}`;
    return (
      <label htmlFor={radioId} className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={cn('focus-ring size-4 border-gray5 text-primary accent-primary', className)}
          {...props}
        />
        {label && <span className="text-foreground">{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
