import React from 'react';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IoCloseCircle } from 'react-icons/io5';
import { BiCoinStack } from 'react-icons/bi';
import moment from 'moment';
import { ISiswaPelanggaran } from 'src/utils/interface';

const PelanggaranCard: React.FC<Props> = ({ pelanggaran, deleteAble }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3}>
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <GridItem>
          <Flex flexDirection={'column'}>
            <Text>{pelanggaran.kategoriPelanggaran.namaKategori}</Text>
            <Text>{moment(pelanggaran.createdAt).format('DD/MM/YYYY')}</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex>
            <BiCoinStack height={'0.75rem'} />
            <Text>Point : {pelanggaran.kategoriPelanggaran.poin}</Text>
          </Flex>
        </GridItem>
      </Grid>
      {deleteAble && (
        <Flex position={'absolute'} top={0} right={0}>
          <IoCloseCircle color="royalOrange.300" />
        </Flex>
      )}
    </Flex>
  );
};

type Props = {
  pelanggaran: ISiswaPelanggaran;
  deleteAble: boolean;
};

export default PelanggaranCard;
