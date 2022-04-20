import React from 'react';
import _ from 'lodash';
import { Document, Page, Text } from '@react-pdf/renderer';
import { DEFAULT_DOCUMENT_PROPS } from 'src/utils/pdfDocument';
import { pdfStyles as styles } from 'src/utils/styles';
import { KopSurat, SiswaNames } from 'src/components/baseComponent/PDFComponent';
import RiwayatTableHead from 'src/components/baseComponent/PDFComponent/RiwayatTableHead';
import RiwayatTableRow from 'src/components/baseComponent/PDFComponent/RiwayatTableRow';
import { ISiswaDetail } from 'src/utils/interface';
import { IResourcesWithId } from 'src/utils/resourceInterface';

const RiwayatDocument: React.FC<Props> = ({ siswa, pelanggarans }) => {
  return (
    <Document {...DEFAULT_DOCUMENT_PROPS} subject={'Riwayat Pelanggaran'}>
      <Page size="A4" style={styles.body}>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

type Props = {
  siswa: ISiswaDetail;
  pelanggarans: IResourcesWithId['pelanggarans'];
};

export default RiwayatDocument;
