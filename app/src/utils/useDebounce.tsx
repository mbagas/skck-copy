import { useEffect } from 'react';

const useDebounce = (
  callback: () => void,
  delay: number,
  dependency: any[] // eslint-disable-line
) => {
  useEffect(
    () => {
      const handler = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [callback, ...dependency, delay] // eslint-disable-line
  );
};

export default useDebounce;
