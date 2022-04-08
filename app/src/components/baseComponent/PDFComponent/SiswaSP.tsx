import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';
import { pdfStyles } from 'src/utils/styles';
import { ISuratPeringatan } from 'src/utils/interface';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 10,
    textOverflow: 'ellipsis',
  },
});

const SiswaSP: React.FC<Props> = ({ suratPeringatan }) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={pdfStyles.text}>Nama</Text>
        </View>
        <View>
          <Text style={pdfStyles.text}>:</Text>
        </View>
        <View style={styles.right}>
          <Text style={pdfStyles.text}>{_.get(suratPeringatan, 'siswa.namaLengkap', '')}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={pdfStyles.text}>NIS</Text>
        </View>
        <View>
          <Text style={pdfStyles.text}>:</Text>
        </View>
        <View style={styles.right}>
          <Text style={pdfStyles.text}>{_.get(suratPeringatan, 'siswa.nis', '')}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={pdfStyles.text}>Total Point</Text>
        </View>
        <View>
          <Text style={pdfStyles.text}>:</Text>
        </View>
        <View style={styles.right}>
          <Text style={pdfStyles.text}>{_.get(suratPeringatan, 'history.totalPoint', 0)}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

type Props = {
  suratPeringatan?: ISuratPeringatan;
};

export default SiswaSP;
