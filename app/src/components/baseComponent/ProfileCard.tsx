import React from 'react';
import _ from 'lodash';
import { Button, Flex, Grid, GridItem, Spacer, Text } from '@chakra-ui/react';
import Avatar from 'react-avatar';
import { ISiswaDetail } from 'src/utils/interface';

const ProfileCard: React.FC<Props> = ({ siswa }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3} boxShadow="lg" p={5}>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }} gap={3}>
        <GridItem>
          <Flex>
            <Avatar name={_.get(siswa, 'namaLengkap', '')} round />
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={3}>
            <GridItem>Nama</GridItem>
            <GridItem>: {_.get(siswa, 'namaLengkap', '')}</GridItem>
            <GridItem>NIS</GridItem>
            <GridItem>: {_.get(siswa, 'nis', '')}</GridItem>
            <GridItem>NISN</GridItem>
            <GridItem>: {_.get(siswa, 'nisn', '')}</GridItem>
            <GridItem>Nama Orang Tua</GridItem>
            <GridItem>: {_.get(siswa, 'namaLengkap', '')}</GridItem>
            <GridItem>No. Telp Orang Tua : </GridItem>
            <GridItem>: {_.get(siswa, 'orangTua.noTelp', '')}</GridItem>
            <GridItem>Alamat</GridItem>
            <GridItem>: {_.get(siswa, 'alamat', '')}</GridItem>
          </Grid>
        </GridItem>
        <GridItem display={{ base: 'none', md: 'flex' }}>
          <Flex flexDirection={{ base: 'row-reverse', md: 'column' }}>
            <Text>Point : {_.get(siswa, 'totalPoint', 0)}</Text>
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
  siswa: ISiswaDetail | undefined;
};

export default ProfileCard;
