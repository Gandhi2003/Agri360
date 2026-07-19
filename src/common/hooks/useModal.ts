import { useCallback, useState } from 'react';

export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const open = useCallback((payload?: T) => {
    setData(payload);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, data, open, close, toggle };
}
