/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { PDFViewer, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';
import useCustomDebounce from 'src/utils/useCustomDebounce';

// Create Document Component
const MyDocument = () => {
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

  return isLoaded ? (
    <PDFViewer style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}>
      <Document>
        <Page size="A4">
          <View style={styles.body}>
            <View>
              <View style={styles.cops}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image style={styles.logo} src={'/sumbar.png'} />
                <View style={styles.cops_inner}>
                  <Text style={styles.cops_title}>PEMERINTAH PROVINSI SUMATERA BARAT</Text>
                  <Text style={styles.cops_title}>DINAS PENDIDIKAN SMA NEGERI 1 BUKITTINGGI</Text>

                  <Text style={styles.cops_title_italic}>
                    Jln. Syekh M. Jamil Jambek No. 36 Bukittinggi Telp. (0721) 22549 626202
                  </Text>
                  <Text style={styles.cops_title_italic}>
                    Website: www.sman1bukittinggi.sch.id e-mail:smansa_landbouw@yahoo.co.id
                  </Text>
                </View>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image style={styles.logo} src={'/logo.png'} />
              </View>
              <View style={styles.borderThin} />
              <View style={styles.borderThicc} />
            </View>
            <Text style={styles.title}>Surat Peringatan 1</Text>
            <Text style={styles.text}>
              Sehubungan dengan sikap indisipliner dan pelanggaran terhadap tata tertib sekolah yang
              siswa lakukan, maka dengan ini sekolah memberikan Surat Peringatan
            </Text>
            <Text style={styles.text}>
              Bahwa siswa tersebut telah melakukan pelanggaran terhadap peraturan Tata Tertib
              Sekolah.
            </Text>
            <Text style={styles.text}>Dengan ini kami sampaikan kepada Bapak/Ibu Wali dari :</Text>
            <Text style={styles.text}>Nama :</Text>
            <Text style={styles.text}>Kelas :</Text>
            <Text style={styles.text}>Total Point :</Text>
            <Text style={styles.text}>
              Sehubungan dengan total point Siswa telah mencapai syarat untuk dikeluarkannya SP 1
              Sekolah memberitahukan kepada Orang Tua/Wali Siswa/i, bahwa Siswa dengan data di atas
              akan menjalani proses pembinaan oleh Guru Bimbingan Konseling dan Wali Kelas serta
              Orang Tua dari Siswa tersebut diharapkan bisa hadir mengikuti sesi bimbingan tersebut.
            </Text>
            <Text style={styles.text}>
              Demikian surat peringatan ini kami sampaikan atas perhatian dan kerjasamanya kami
              ucapkan terimakasih.
            </Text>
            <Text style={styles.text_right}>Bukittinggi, ............20....</Text>
            <Text style={styles.text}>Mengetahui,</Text>
            <View style={styles.signature}>
              <Text style={styles.text}>Guru BK</Text>
              <Text style={styles.text}>Orang Tua Siswa</Text>
            </View>
            <View style={styles.signature}>
              <Image style={styles.ttd} src={process.env.NEXT_PUBLIC_TTD_PATH} />
              <Image style={styles.ttd} src={process.env.NEXT_PUBLIC_TTD_PATH} />
            </View>
            <View>
              <View style={styles.signature}>
                <Text style={styles.text}>M.Daus</Text>
                <Text style={styles.text}>M.Bagas</Text>
              </View>
              <View style={styles.signature}>
                <Text style={styles.text}>Kepala Sekolah</Text>
                <Text style={styles.text}>PKS Kesiswaan</Text>
              </View>
            </View>
            <View style={styles.signature}>
              <Image style={styles.ttd} src={process.env.NEXT_PUBLIC_TTD_PATH} />
              <Image style={styles.ttd} src={process.env.NEXT_PUBLIC_TTD_PATH} />
            </View>
            <View style={styles.signature}>
              <Text style={styles.text}>Ilham</Text>
              <Text style={styles.text}>Fahri</Text>
            </View>
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

export default MyDocument;
