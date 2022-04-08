import { View, Text, StyleSheet } from '@react-pdf/renderer';

const RiwayatTableHead = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 12,
      padding: 5,
      borderColor: '#bff0fd',
      borderWidth: 1,
    },
    names: {
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      width: '55%',
      textAlign: 'center',
    },
    point: {
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      width: '20%',
      textAlign: 'center',
    },
    date: {
      textAlign: 'center',
      width: '20%',
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
