import { useEffect, useState } from 'react';
import { DEBOUNCE_MS } from '@common/constants';

/** Returns a debounced copy of `value` that updates `delay` ms after it settles. */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
