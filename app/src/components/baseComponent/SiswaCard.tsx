import React from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { BiCoinStack } from 'react-icons/bi';
import { ISiswa } from 'src/utils/interface';

const SiswaCard: React.FC<Props> = ({ siswa }) => {
  return (
    <Flex
      borderRadius={15}
      alignItems="center"
      position={'relative'}
      py={2}
      width={'100%'}
      boxShadow="lg"
      borderColor="black"
      onClick={() => Router.push(`${Router.pathname}/${siswa.id}`)}
      cursor={'pointer'}
    >
      <Grid alignItems="center" templateColumns="repeat(2, 1fr)" gap={3} width={'100%'}>
        <GridItem>
          <Flex ml={10} flexDirection={'column'}>
            <Text>
              {siswa.nis}/{siswa.nisn}
            </Text>
            <Text>{siswa.namaLengkap}</Text>
          </Flex>
        </GridItem>
        <GridItem px={{ base: '0', md: '12' }}>
          <Flex mr={10} justifyContent={'flex-end'}>
            <BiCoinStack color="red" height={'0.75rem'} />
            <Text ml={2}>Poin : {_.get(siswa, 'totalPoint', 0)}</Text>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

type Props = {
  siswa: ISiswa;
};

export default SiswaCard;
