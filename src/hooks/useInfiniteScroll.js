import { useRef, useCallback, useEffect } from "react";

export function useInfiniteScroll({ hasMore, loading, loadingMore, onLoadMore }) {
  // Store latest values in refs to avoid stale closures
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);
  const loadingMoreRef = useRef(loadingMore);
  const onLoadMoreRef = useRef(onLoadMore);

  // Keep refs updated on every render
  useEffect(() => {
    hasMoreRef.current = hasMore;
    loadingRef.current = loading;
    loadingMoreRef.current = loadingMore;
    onLoadMoreRef.current = onLoadMore;
  });

  const observerRef = useRef(null);

  // Callback ref – attaches to the sentinel element
  const sentinelRef = useCallback((node) => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) return;

    // Create new observer for this node
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current &&
          !loadingMoreRef.current
        ) {
          onLoadMoreRef.current();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []); // No dependencies – the refs provide fresh values

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { sentinelRef };
}