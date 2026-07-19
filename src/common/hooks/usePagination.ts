import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@common/constants';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = DEFAULT_PAGE_SIZE,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset = useCallback(() => setPage(initialPage), [initialPage]);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  return useMemo(
    () => ({ page, pageSize, setPage, setPageSize: changePageSize, nextPage, prevPage, reset }),
    [page, pageSize, changePageSize, nextPage, prevPage, reset],
  );
}
