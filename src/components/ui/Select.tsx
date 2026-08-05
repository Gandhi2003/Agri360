import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@lib/cn';
import type { SelectOption } from '@common/types';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-2 block text-xs font-bold text-[#1d252db3]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'focus-ring h-10 w-full appearance-none rounded-md border border-gray5 bg-card px-3 pr-9 text-sm text-foreground disabled:opacity-50',
              error && 'border-danger focus-visible:border-danger',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
