import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export function useApi<TData>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData, Error, TData>({ queryKey, queryFn, ...options });
}
