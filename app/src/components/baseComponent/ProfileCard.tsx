import React from 'react';
import _ from 'lodash';
import { Button, Flex, Grid, GridItem, Spacer, Text } from '@chakra-ui/react';
import Avatar from 'react-avatar';
import { ISiswaDetail } from 'src/utils/interface';

const ProfileCard: React.FC<Props> = ({ siswa }) => {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      borderRadius={25}
      alignItems="center"
      position={'relative'}
      boxShadow="lg"
      p={{ base: 2, md: 5 }}
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }} mb={{ base: 3, md: 0 }}>
        <Flex mr={3} justifyContent={'center'} mb={{ base: 3, md: 0 }}>
          <Avatar name={_.get(siswa, 'namaLengkap', '')} round />
        </Flex>
        <Grid templateColumns={'repeat(2, 1fr)'}>
          <GridItem>Nama</GridItem>
          <GridItem>: {_.get(siswa, 'namaLengkap', '')}</GridItem>
          <GridItem>NIS</GridItem>
          <GridItem>: {_.get(siswa, 'nis', '')}</GridItem>
          <GridItem>NISN</GridItem>
          <GridItem>: {_.get(siswa, 'nisn', '')}</GridItem>
          <GridItem>Nama Orang Tua</GridItem>
          <GridItem>: {_.get(siswa, 'namaLengkap', '')}</GridItem>
          <GridItem>No.Telp Orang Tua</GridItem>
          <GridItem>: {_.get(siswa, 'orangTua.noTelp', '')}</GridItem>
          <GridItem>Alamat</GridItem>
          <GridItem>: {_.get(siswa, 'alamat', '')}</GridItem>
        </Grid>
      </Flex>
      <Spacer />
      <Flex flexDirection={{ base: 'row-reverse', md: 'column' }}>
        <Text>Point : {_.get(siswa, 'totalPoint', 0)}</Text>
        <Spacer />
        <Flex flexDirection={'column'}>
          <Button>Cetak Pelanggaran</Button>
          <Button>Cetak Pelanggaran</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

type Props = {
  siswa: ISiswaDetail | undefined;
};

export default ProfileCard;
