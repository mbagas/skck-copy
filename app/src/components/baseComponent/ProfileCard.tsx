import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import Avatar from 'react-avatar';
import { Image, Flex, Grid, GridItem, Spacer, Text } from '@chakra-ui/react';
import { USER_ROLE } from 'src/utils/constant';
import { ISiswaDetail, RoleType } from 'src/utils/interface';
import { getRole } from 'src/utils/sessionUtils';

const ProfileCard: React.FC<Props> = ({ siswa }) => {
  const [role, setRole] = useState<RoleType>(USER_ROLE.ORANG_TUA);

  useEffect(() => {
    setRole(getRole()!);
  }, []);

  const goToRiwayat = () => {
    if (role === USER_ROLE.SISWA) Router.push('/riwayat');
    Router.push({
      pathname: `${Router.pathname}/riwayat`,
      query: {
        id: Router.query.id as string,
      },
    });
  };

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
        <Flex
          flexDirection="column"
          cursor={'pointer'}
          width={{ base: '2.5rem', md: '3rem' }}
          onClick={goToRiwayat}
        >
          <Flex
            bg={'royalGray.100'}
            _hover={{ bg: 'royalGray.200' }}
            rounded={'md'}
            alignItems={'center'}
            px={2}
            border={'1px solid rgba(0, 0, 0, 0.34)'}
            boxShadow={'lg'}
          >
            <Image src="pdf.png" alt="cetak pelanggaran" />
          </Flex>
          <Text fontSize={{ base: 8, md: 12 }} textAlign="center">
            Cetak pelanggaran
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

type Props = {
  siswa: ISiswaDetail | undefined;
};

export default ProfileCard;
