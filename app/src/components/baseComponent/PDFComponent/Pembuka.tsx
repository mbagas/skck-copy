import React from 'react';
import { Text } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';

const Pembuka: React.FC<Props> = ({ type }) => {
  return (
    <React.Fragment>
      <Text style={styles.text}>
        Sehubungan dengan sikap indisipliner dan pelanggaran terhadap tata tertib sekolah yang siswa
        lakukan, maka dengan ini sekolah memberikan Surat Peringatan {type}.
      </Text>
      <Text style={styles.text}>Dengan ini kami sampaikan kepada Bapak/Ibu Wali dari :</Text>
    </React.Fragment>
  );
};

type Props = { type: number };

export default Pembuka;
