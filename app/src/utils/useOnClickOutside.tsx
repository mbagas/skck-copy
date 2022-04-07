import React, { useEffect, useCallback } from 'react';

const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement> | React.RefObject<HTMLDivElement>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  const callbackRef = useCallback(handler, [handler]);

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      callbackRef(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callbackRef]);
};
export default useOnClickOutside;
