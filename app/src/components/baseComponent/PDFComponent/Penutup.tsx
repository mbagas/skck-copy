import React from 'react';
import { Text } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';

const Penutup = () => {
  return (
    <Text style={styles.text}>
      Demikian surat peringatan ini kami sampaikan atas perhatian dan kerjasamanya kami ucapkan
      terimakasih.
    </Text>
  );
};

export default Penutup;
