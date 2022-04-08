/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';

const Signature = () => {
  return (
    <View style={{ margin: 50 }}>
      <Text style={styles.text_right}>Bukittinggi, ............20....</Text>
      <Text style={styles.text}>Mengetahui,</Text>
      <View style={styles.signature}>
        <Text style={styles.text}>Kepala Sekolah</Text>
        <Image style={styles.ttd} src={'/ttd.jpeg'} />
        <Text style={styles.text}>Ilham</Text>
      </View>
      <View style={styles.signature}>
        <Text style={styles.text}>Wakil Kesiswaan</Text>
        <Image style={styles.ttd} src={'/ttd.jpeg'} />
        <Text style={styles.text}>Fahri</Text>
      </View>
    </View>
  );
};

export default Signature;
