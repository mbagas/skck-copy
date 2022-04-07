import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ISiswaPelanggaran } from 'src/utils/interface';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: '#bff0fd',
    borderWidth: 1,
    alignItems: 'center',
    fontSize: 12,
    padding: 5,
  },
  names: {
    borderRightColor: '#90e5fc',
    borderRightWidth: 1,
    width: '55%',
  },
  point: {
    borderRightColor: '#90e5fc',
    borderRightWidth: 1,
    width: '20%',
    textAlign: 'center',
  },
  date: {
    width: '25%',
    textAlign: 'center',
  },
});

const RiwayatTableRow: React.FC<Props> = ({ pelanggaran }) => {
  return (
    <View style={styles.row} key={pelanggaran.id}>
      <Text style={styles.names}>{_.get(pelanggaran, 'kategoriPelanggaran.namaKategori', '')}</Text>
      <Text style={styles.point}>{_.get(pelanggaran, 'kategoriPelanggaran.poin', 0)}</Text>
      <Text style={styles.date}>{moment(pelanggaran.createdAt).format('DD MMM YYYY')}</Text>
    </View>
  );
};

type Props = { pelanggaran: ISiswaPelanggaran };

export default RiwayatTableRow;
