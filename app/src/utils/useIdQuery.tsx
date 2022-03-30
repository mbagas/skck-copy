import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import useDebounce from './useDebounce';

const useIdQuery = (): number => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [queryId, setQueryId] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useDebounce(
    () => {
      const id = Number(router.query.id as string);

      if (_.isNil(id)) return;

      setQueryId(id);
    },
    500,
    [isLoading]
  );

  return queryId;
};

export default useIdQuery;
