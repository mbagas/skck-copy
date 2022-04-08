import { View, Text, StyleSheet } from '@react-pdf/renderer';

const RiwayatTableHead = () => {
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

  return (
    <View style={styles.row}>
      <Text style={styles.names}>Nama Pelanggaran</Text>
      <Text style={styles.point}>Poin</Text>
      <Text style={styles.date}>Tanggal</Text>
    </View>
  );
};

export default RiwayatTableHead;
