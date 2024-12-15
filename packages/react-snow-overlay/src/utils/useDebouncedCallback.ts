import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(
    () => () =>
      void (timeoutRef.current !== null && clearTimeout(timeoutRef.current)),
  );

  return debouncedCallback;
};
