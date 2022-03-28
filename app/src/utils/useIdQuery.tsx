import { useEffect, useState } from 'react';
import Router from 'next/router';
import _ from 'lodash';
import useDebounce from './useDebounce';

const useIdQuery = (): number => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [queryId, setQueryId] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useDebounce(
    () => {
      const { id } = Router.query;

      if (_.isEmpty(id)) return;

      const useableId: string | undefined = _.isString(id) ? id : _.isArray(id) ? _.first(id) : id;

      if (_.isNil(useableId)) return;

      setQueryId(_.toNumber(useableId));
    },
    500,
    [isLoading]
  );

  return queryId;
};

export default useIdQuery;
