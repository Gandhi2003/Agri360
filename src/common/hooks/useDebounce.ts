import { useEffect, useState } from 'react';
import { DEBOUNCE_MS } from '@common/constants';

export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
