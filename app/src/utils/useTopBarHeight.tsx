/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

const useTopBarHeight = () => {
  const [topBarHeight, setTopBarHeight] = useState(66);

  useEffect(() => {
    const subscribe = () => {
      setTopBarHeight(Number(localStorage.getItem('top_bar_height')! ?? 66));
    };

    subscribe();

    window.addEventListener('resize', subscribe);

    return () => {
      window.removeEventListener('resize', subscribe);
    };
  }, [topBarHeight]);

  return topBarHeight;
};

export default useTopBarHeight;
