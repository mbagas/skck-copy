import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { pdfStyles as styles } from 'src/utils/styles';

const KopSurat = () => {
  return (
    <View>
      <View style={styles.cops}>
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
        <Image style={styles.logo} src={'/logo.png'} />
      </View>
      <View style={styles.borderThin} />
      <View style={styles.borderThicc} />
    </View>
  );
};

export default KopSurat;
