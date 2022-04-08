import { useEffect, useState } from 'react';
import Router from 'next/router';
import { ISuratPeringatan } from './interface';
import { getSuratPelanggaran } from 'src/store/actions/resources';
import useCustomDebounce from './useCustomDebounce';

const useSPGenerator = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [suratPelanggaran, setSuratPelanggaran] = useState<ISuratPeringatan>();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useCustomDebounce(
    () => {
      if (!isLoaded) return;

      const nis = Number(Router.query.nis as string);
      const spKe = Number(Router.query.spKe as string);

      (async () => {
        try {
          const suratPelanggaran = await getSuratPelanggaran(nis, spKe)();
          setSuratPelanggaran(suratPelanggaran);
        } catch {
          Router.push('/404');
        }
      })();
    },
    500,
    [isLoaded]
  );

  return suratPelanggaran;
};

export default useSPGenerator;
