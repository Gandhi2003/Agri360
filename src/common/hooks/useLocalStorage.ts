import { useCallback, useState } from 'react';
import { storage } from '@common/helpers';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => storage.get<T>(key) ?? initialValue);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        storage.set(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    storage.remove(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, set, remove] as const;
}
