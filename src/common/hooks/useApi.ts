import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

/**
 * Lightweight typed wrapper over `useQuery` for one-off endpoints that don't
 * warrant a dedicated feature hook. Prefer feature hooks for domain resources.
 */
export function useApi<TData>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData, Error, TData>({ queryKey, queryFn, ...options });
}
