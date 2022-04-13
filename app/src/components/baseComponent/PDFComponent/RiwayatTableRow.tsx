import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ISiswaPelanggaran } from 'src/utils/interface';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 1.5,
  },
  names: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: '55%',
    marginHorizontal: 3,
  },
  point: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: '20%',
    textAlign: 'center',
    marginHorizontal: 3,
  },
  date: {
    width: '25%',
    marginHorizontal: 3,
  },
});

const RiwayatTableRow: React.FC<Props> = ({ pelanggaran }) => {
  return (
    <View style={styles.row} key={pelanggaran.id}>
      <Text style={styles.names}>{_.get(pelanggaran, 'kategoriPelanggaran.namaKategori', '')}</Text>
      <Text style={styles.point}>{_.get(pelanggaran, 'kategoriPelanggaran.poin', 0)}</Text>
      <Text style={styles.date}>{moment(pelanggaran.createdAt).format('DD MMMM YYYY')}</Text>
    </View>
  );
};

type Props = { pelanggaran: ISiswaPelanggaran };

export default RiwayatTableRow;
