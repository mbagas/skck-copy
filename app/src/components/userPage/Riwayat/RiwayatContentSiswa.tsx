/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMediaQuery } from '@chakra-ui/react';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import useGetDataById from 'src/utils/useGetDataById';
import { getPelanggaranSiswa as _getPelanggaranSiswa } from 'src/store/actions/resources';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { getAccountId } from 'src/utils/sessionUtils';
import useTopBarHeight from 'src/utils/useTopBarHeight';
import RiwayatDocument from './RiwayatDocument';

const RiwayatContentSiswa: React.FC<Props> = ({ pelanggarans, getPelanggarans }) => {
  const [siswaId, setSiswaId] = useState<number>(0);
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, siswaId);
  const [limit] = useState<string | number>('all');
  const decreasor = useTopBarHeight();
  const [isOnBase] = useMediaQuery(['(max-width: 768px)']);

  const renderUrl = (): Promise<string> =>
    new Promise(async (resolve) => {
      const blob = await ReactPDF.pdf(
        <RiwayatDocument pelanggarans={pelanggarans} siswa={siswa!} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      if (url && url.length > 0) {
        resolve(url);
      }
    });

  const generateBlob = async () => {
    const url = await renderUrl();

    if (!url) return;

    window.open();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.style['display'] = 'none';
    aTag.download = `Riwayat Pelanggaran - ${siswa!.namaLengkap}.pdf`;
    aTag.click();
  };

  useEffect(() => {
    if (!siswa) return;

    if (isOnBase) generateBlob();
  }, [siswa]); // eslint-disable-line

  useEffect(() => {
    setSiswaId(getAccountId()!);
  }, []);

  useCustomDebounce(
    async () => {
      if (!siswaId) return;

      await getPelanggarans(siswaId, `limit=${limit}`);
    },
    750,
    [siswaId]
  );

  return siswa ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <RiwayatDocument pelanggarans={pelanggarans} siswa={siswa} />
    </PDFViewer>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getPelanggaransOrdered(ORDER.ASC)(state),
});

const connector = connect(mapStateToProps, {
  getPelanggarans: _getPelanggaranSiswa,
});

type Props = ConnectedProps<typeof connector>;

export default connector(RiwayatContentSiswa);
