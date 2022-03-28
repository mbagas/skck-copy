/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

/**
 * Call a callback after a certain delay when dependencies change.
 * @param { callback } callback - The callback to call.
 * @param { number } delay - The delay to react in milliseconds.
 * @param { any[] } dependencies - The dependencies to watch.
 */
const useCustomDebounce = (callback: () => void, delay: number, dependencies: any[]) => {
  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [...dependencies, delay]); // eslint-disable-line
};

export default useCustomDebounce;
