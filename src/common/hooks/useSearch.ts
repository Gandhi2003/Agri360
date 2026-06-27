import { useState } from 'react';
import { DEBOUNCE_MS } from '@common/constants';
import { useDebounce } from './useDebounce';

/** Controlled search term + its debounced value for query params. */
export function useSearch(initial = '', delay = DEBOUNCE_MS) {
  const [term, setTerm] = useState(initial);
  const debouncedTerm = useDebounce(term, delay);
  return { term, setTerm, debouncedTerm, clear: () => setTerm('') };
}
