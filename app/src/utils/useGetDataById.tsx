import { useState } from 'react';
import { getDataById } from 'src/store/actions/resources';
import useCustomDebounce from './useCustomDebounce';
import { ResourceKey, IDetailResource } from './resourceInterface';

const useGetDataById = <T extends ResourceKey>(resourceName: T, id: number) => {
  const [data, setData] = useState<IDetailResource[T]>();

  useCustomDebounce(
    async () => {
      if (!id) return;

      const data = await getDataById(resourceName, id)();
      setData(data);
    },
    500,
    [id]
  );

  return data;
};

export default useGetDataById;
