import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

/**
 * Returns a ref callback to attach to a sentinel element; invokes `onLoadMore`
 * when it scrolls into view (IntersectionObserver based).
 */
export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = '200px',
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      observer.current?.disconnect();
      if (!node) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMore) onLoadMore();
        },
        { rootMargin },
      );
      observer.current.observe(node);
    },
    [hasMore, isLoading, onLoadMore, rootMargin],
  );

  useEffect(() => () => observer.current?.disconnect(), []);

  return { sentinelRef };
}
