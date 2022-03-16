import React from 'react';
import { Button, Flex, Grid, GridItem, Spacer, Text } from '@chakra-ui/react';
import Avatar from 'react-avatar';
import { ISiswaDetail } from 'src/utils/interface';

const ProfileCard: React.FC<Props> = ({ siswa }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3}>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }} gap={3}>
        <GridItem>
          <Flex>
            <Avatar name={siswa.namaLengkap} />
          </Flex>
        </GridItem>
        <GridItem colSpan={2}>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={3}>
            <GridItem>Nama</GridItem>
            <GridItem>: {siswa.namaLengkap}</GridItem>
            <GridItem>NIS</GridItem>
            <GridItem>: {siswa.nis}</GridItem>
            <GridItem>NISN</GridItem>
            <GridItem>: {siswa.nisn}</GridItem>
            <GridItem>Nama Orang Tua</GridItem>
            <GridItem>: {siswa.namaLengkap}</GridItem>
            <GridItem>No. Telp Orang Tua : </GridItem>
            <GridItem>: {siswa.orangTua.noTelp}</GridItem>
            <GridItem>Alamat</GridItem>
            <GridItem>: {siswa.alamat}</GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Flex flexDirection={{ base: 'row-reverse', sm: 'column' }}>
            <Text>Point : {siswa.totalPoint.totalPoint}</Text>
            <Spacer />
            <Button>Cetak Pelanggaran</Button>
            <Button>Cetak Pelanggaran</Button>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

type Props = {
  siswa: ISiswaDetail;
};

export default ProfileCard;
