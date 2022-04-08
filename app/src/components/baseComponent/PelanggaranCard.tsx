import React from 'react';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IoCloseCircle } from 'react-icons/io5';
import { BiCoinStack } from 'react-icons/bi';
import moment from 'moment';
import { ISiswaPelanggaran } from 'src/utils/interface';
import _ from 'lodash';

const PelanggaranCard: React.FC<Props> = ({ pelanggaran, deleteAble, onClickDelete }) => {
  return (
    <Flex
      borderRadius={10}
      alignItems="center"
      position={'relative'}
      py={2}
      width={'100%'}
      boxShadow="lg"
      borderColor="black"
      userSelect={'none'}
    >
      <Grid alignItems="center" templateColumns="repeat(2, 1fr)" gap={3} width={'100%'} p={3}>
        <GridItem>
          <Flex flexDirection={'column'}>
            <Text>{_.get(pelanggaran, 'kategoriPelanggaran.namaKategori', '')}</Text>
            <Text>{moment(pelanggaran.createdAt).format('DD/MM/YYYY')}</Text>
          </Flex>
        </GridItem>
        <GridItem px={{ base: '0', md: '12' }}>
          <Flex mr={10} justifyContent={'flex-end'} alignItems="center">
            <Flex pb={1}>
              <BiCoinStack height={'0.75rem'} />
            </Flex>
            <Text>Poin : {_.get(pelanggaran, 'kategoriPelanggaran.poin', 0)}</Text>
          </Flex>
        </GridItem>
      </Grid>
      {deleteAble && (
        <Flex
          position={'absolute'}
          top={2}
          right={-2}
          color="royalRed.200"
          _hover={{ color: 'royalRed.300' }}
          onClick={() => onClickDelete?.(pelanggaran.id)}
        >
          <IoCloseCircle fontSize={'1.8rem'} />
        </Flex>
      )}
    </Flex>
  );
};

type Props = {
  pelanggaran: ISiswaPelanggaran;
  deleteAble: boolean;
  onClickDelete?: (id: number) => void;
};

export default PelanggaranCard;
