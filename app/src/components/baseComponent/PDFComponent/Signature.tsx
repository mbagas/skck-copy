/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { pdfStyles } from 'src/utils/styles';
import { ISuratPeringatan } from 'src/utils/interface';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  signature: {
    flexDirection: 'column',
    flex: 1,
  },
  text_right: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
  },
  ttd: {
    height: 80,
    width: 160,
  },
  placeholder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

const Signature: React.FC<Props> = ({ suratPeringatan }) => {
  return (
    <React.Fragment>
      <Text style={styles.text_right}>
        Bukittinggi,{' '}
        {moment(_.get(suratPeringatan, 'history.createdAt', new Date())).format('DD MMMM YYYY')}
      </Text>
      <Text style={pdfStyles.text}>Mengetahui,</Text>
      <View style={styles.container}>
        <View style={styles.signature}>
          <Text style={pdfStyles.text}>Kepala Sekolah</Text>
          <View style={styles.placeholder}>
            <Image style={styles.ttd} src={'/ttd-1.jpeg'} />
            <Text style={pdfStyles.text}>Dra. Silfa Dusun, M.Pd</Text>
          </View>
        </View>
        <View style={styles.signature} />
        <View style={styles.signature}>
          <Text style={pdfStyles.text}>Wakil Kesiswaan</Text>
          <View style={styles.placeholder}>
            <Image style={styles.ttd} src={'/ttd-2.jpeg'} />
            <Text style={pdfStyles.text}>Idris, S. Ag</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

type Props = {
  suratPeringatan?: ISuratPeringatan;
};

export default Signature;
