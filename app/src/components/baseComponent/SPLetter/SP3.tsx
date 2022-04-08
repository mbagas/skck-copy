/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { KopSurat, Pembuka, Penutup, Signature, SiswaSP } from '../PDFComponent';
import useSPGenerator from 'src/utils/useSPGenerator';

// Create Document Component
const MyDocument = () => {
  const suratPeringatan = useSPGenerator();
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

  return isLoaded && suratPeringatan ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <Document>
        <Page size="A4">
          <View style={styles.body}>
            <KopSurat />
            <Text style={styles.title}>Surat Peringatan 3 </Text>
            <Pembuka type={3} />
            <SiswaSP suratPeringatan={suratPeringatan} />
            <Text style={styles.text}>
              Berhubung dengan total poin Siswa telah mencapai syarat untuk dikeluarkannya Surat
              Peringatan 3, Sekolah memberitahukan kepada Orang Tua/Wali siswa/i, bahwa siswa dengan
              data di atas akan ditindaklanjuti oleh Kepala sekolah bersama kedua orang tua dari
              siswa/i tersebut. Bapak/Ibu diharapkan untuk dapat hadir dalam proses pemulangan
              siswa/i kepada orang tua/wali.
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
