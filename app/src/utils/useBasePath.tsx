import { useEffect, useState } from 'react';
import Router from 'next/router';

const useBasePath = (): string => {
  const [basePath, setBasePath] = useState<string>('');

  useEffect(() => {
    setBasePath(Router.basePath);
  }, []);

  return basePath;
};

export default useBasePath;
