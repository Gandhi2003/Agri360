import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type SelectHTMLAttributes,
} from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { cn } from '@lib/cn';
import type { SelectOption } from '@common/types';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
}

/**
 * Renders a real <select> (kept sr-only) so react-hook-form's register()/setFocus()
 * and plain controlled value/onChange usage keep working unchanged, while a custom
 * button + searchable listbox provides the visible UI.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder = 'Select',
      searchPlaceholder = 'Search...',
      className,
      id,
      value,
      defaultValue,
      onChange,
      onBlur,
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? props.name;
    const selectRef = useRef<HTMLSelectElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => selectRef.current as HTMLSelectElement);

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(() => String(defaultValue ?? ''));
    const currentValue = String(isControlled ? value : uncontrolledValue);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [dropUp, setDropUp] = useState(false);

    useEffect(() => {
      if (!isControlled) {
        setUncontrolledValue(selectRef.current?.value ?? '');
      }
      // Sync the visible label with the DOM select's initial value — react-hook-form
      // assigns defaultValues directly on the ref, bypassing React state.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!open) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        setDropUp(spaceBelow < 280 && spaceAbove > spaceBelow);
      }
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          setSearch('');
        }
      };
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          setSearch('');
          buttonRef.current?.focus();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open]);

    const filteredOptions = useMemo(() => {
      const term = search.trim().toLowerCase();
      if (!term) return options;
      return options.filter((opt) => opt.label.toLowerCase().includes(term));
    }, [options, search]);

    const selectedOption = options.find((opt) => String(opt.value) === currentValue);

    const commitValue = (nextValue: string) => {
      const el = selectRef.current;
      if (el) {
        el.value = nextValue;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (!isControlled) setUncontrolledValue(nextValue);
      setOpen(false);
      setSearch('');
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-2 block text-xs font-bold text-[#1d252db3]">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          <select
            ref={selectRef}
            id={selectId}
            value={isControlled ? value : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            onFocus={() => buttonRef.current?.focus()}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
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

          <button
            ref={buttonRef}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              'focus-ring flex h-10 w-full items-center justify-between rounded-md border border-gray5 bg-card px-3 pr-9 text-left text-sm disabled:opacity-50',
              selectedOption ? 'text-foreground' : 'text-muted-foreground',
              error && 'border-danger focus-visible:border-danger',
              className,
            )}
          >
            <span className="truncate">{selectedOption?.label ?? placeholder}</span>
            <AiFillCaretDown
              className={cn(
                'pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 text-gray13 transition-transform',
                open && 'rotate-180',
              )}
            />
          </button>

          {open && (
            <div
              className={cn(
                'absolute z-20 w-full rounded-md bg-card py-2 shadow-lg',
                dropUp ? 'bottom-full mb-1' : 'top-full mt-1',
              )}
            >
              <div className="mb-2 px-2">
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-9 w-full rounded-md border border-gray5 bg-card px-3 text-sm text-foreground outline-none"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto" role="listbox">
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
                ) : (
                  filteredOptions.map((opt) => (
                    <li key={String(opt.value)}>
                      <button
                        type="button"
                        disabled={opt.disabled}
                        role="option"
                        aria-selected={String(opt.value) === currentValue}
                        onClick={() => commitValue(String(opt.value))}
                        className={cn(
                          'w-full px-3 py-2 text-left text-sm font-semibold text-foreground hover:bg-gray12 disabled:opacity-50',
                          String(opt.value) === currentValue && 'bg-gray12',
                        )}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
