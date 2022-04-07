/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { KopSurat } from '../baseComponent/PDFComponent';
import { getAccountId } from 'src/utils/sessionUtils';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import useGetDataById from 'src/utils/useGetDataById';
import { getPelanggaranSiswa as _getPelanggaranSiswa } from 'src/store/actions/resources';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import useIdQuery from 'src/utils/useIdQuery';
import RiwayatTableHead from '../baseComponent/PDFComponent/RiwayatTableHead';
import RiwayatTableRow from '../baseComponent/PDFComponent/RiwayatTableRow';

const RiwayatContent: React.FC<Props> = ({ pelanggarans, getPelanggarans }) => {
  const queryId = useIdQuery();
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, queryId);
  const [limit] = useState<string | number>('all');

  useEffect(() => {
    (async () => {
      await getPelanggarans(getAccountId()!, `limit=${limit}`);
    })();
  }, []); // eslint-disable-line

  const [showData, setShowData] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [decreasor, setDecreasor] = useState<string>();

  useEffect(() => {
    setShowData(true);
    setDecreasor(localStorage.getItem('top_bar_height')!);
  }, []);

  useCustomDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [showData]
  );
  return isLoaded && siswa ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <Document>
        <Page size="A4">
          <View style={styles.body}>
            <KopSurat />
            <Text style={styles.title}>Riwayat Pelanggaran</Text>
            <Text style={styles.text}>
              Sehubungan dengan sikap indisipliner dan pelanggaran terhadap tata tertib sekolah yang
              siswa lakukan, maka dengan ini sekolah memberikan detail dari pelanggaran yang telah
              dilakukan.
            </Text>
            <Text style={styles.text}>Dengan ini kami sampaikan kepada Bapak/Ibu Wali dari :</Text>
            <Text style={styles.text}>Nama{'   '}:</Text>
            <Text style={styles.text}>NIS{'    '}:</Text>
            <Text style={styles.text}>Total Poin :</Text>
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

export default connector(RiwayatContent);
