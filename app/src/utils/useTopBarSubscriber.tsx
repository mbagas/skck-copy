import React, { useEffect } from 'react';

const useTopBarSubscriber = (topbarRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const subscribe = () => {
      localStorage.setItem('top_bar_height', `${topbarRef.current?.scrollHeight || 66}`);
    };

    subscribe();

    window.addEventListener('resize', subscribe);

    return () => {
      window.removeEventListener('resize', subscribe);
    };
  }, []); // eslint-disable-line
};

export default useTopBarSubscriber;
