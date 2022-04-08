/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  cops: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cops_inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cops_title: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  cops_title_italic: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  borderThin: {
    marginTop: 5,
    marginBottom: 1,
    display: 'flex',
    height: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  borderThicc: {
    marginTop: 1,
    marginBottom: 1,
    display: 'flex',
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  'logo.sumbar': {
    height: 55.6,
    width: 54.2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  'logo.smansa': {
    height: 54.2,
    width: 54.2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

const KopSurat = () => {
  return (
    <React.Fragment>
      <View style={styles.cops}>
        <Image style={styles['logo.sumbar']} src={'/sumbar.png'} />
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
        <Image style={styles['logo.smansa']} src={'/logo.png'} />
      </View>
      <View style={styles.borderThin} />
      <View style={styles.borderThicc} />
    </React.Fragment>
  );
};

export default KopSurat;
