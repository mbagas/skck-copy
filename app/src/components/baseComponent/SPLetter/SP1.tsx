import React from 'react';
import { PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';
import { KopSurat, Pembuka, Penutup, Signature, SiswaSP } from '../PDFComponent';
import useSPGenerator from 'src/utils/useSPGenerator';
import useTopBarHeight from 'src/utils/useTopBarHeight';

// Create Document Component
const MyDocument = () => {
  const suratPeringatan = useSPGenerator();
  const decreasor = useTopBarHeight();

  return suratPeringatan ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <Document>
        <Page size="A4">
          <View style={styles.body}>
            <KopSurat />
            <Text style={styles.title}>Surat Peringatan 1</Text>
            <Pembuka type={1} />
            <SiswaSP suratPeringatan={suratPeringatan} />
            <Text style={styles.text}>
              Berhubung dengan total poin siswa telah mencapai syarat untuk dikeluarkannya Surat
              Peringatan 1, Sekolah memberitahukan kepada Orang Tua/Wali Siswa/i, bahwa siswa/i
              dengan diatas akan menjalani proses pembinaan oleh Guru Bimbingan Konseling dan Wali
              Kelas beserta dengan Bapak/Ibu Wali dari siswa/i tersebut. Diharapkan kehadiran
              Bapak/Ibu dalam sesi bimbingan tersebut.
            </Text>
            <Penutup />
            <Signature suratPeringatan={suratPeringatan} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

export default MyDocument;
