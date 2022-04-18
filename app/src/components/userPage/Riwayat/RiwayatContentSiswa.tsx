/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import useGetDataById from 'src/utils/useGetDataById';
import { getPelanggaranSiswa as _getPelanggaranSiswa } from 'src/store/actions/resources';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import { getAccountId } from 'src/utils/sessionUtils';
import { SiswaNames, KopSurat } from 'src/components/baseComponent/PDFComponent';
import RiwayatTableHead from 'src/components/baseComponent/PDFComponent/RiwayatTableHead';
import RiwayatTableRow from 'src/components/baseComponent/PDFComponent/RiwayatTableRow';
import useTopBarHeight from 'src/utils/useTopBarHeight';

const RiwayatContentSiswa: React.FC<Props> = ({ pelanggarans, getPelanggarans }) => {
  const [siswaId, setSiswaId] = useState<number>(0);
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, siswaId);
  const [limit] = useState<string | number>('all');
  const decreasor = useTopBarHeight();

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
      <Document>
        <Page size="A4">
          <View style={styles.body}>
            <KopSurat />
            <Text style={styles.title}>Riwayat Pelanggaran</Text>
            <Text style={styles.text}>
              Berhubung dengan sikap indisipliner dan pelanggaran terhadap tata tertib sekolah yang
              siswa lakukan, maka dengan ini sekolah memberikan rincian dari pelanggaran yang telah
              dilakukan.
            </Text>
            <Text style={styles.text}>Dengan ini kami sampaikan kepada Bapak/Ibu Wali dari :</Text>
            <SiswaNames siswa={siswa} />
            <RiwayatTableHead />
            {_.map(pelanggarans.rows, (pelanggaran) => (
              <RiwayatTableRow key={pelanggaran.id} pelanggaran={pelanggaran} />
            ))}
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};
const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getResourceOrder(state, ORDER.ASC),
});

const connector = connect(mapStateToProps, {
  getPelanggarans: _getPelanggaranSiswa,
});

type Props = ConnectedProps<typeof connector>;

export default connector(RiwayatContentSiswa);
