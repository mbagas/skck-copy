import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IHistory, ISiswaDetail } from 'src/utils/interface';

const SPCard: React.FC<Props> = ({ siswa, history }) => {
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
            <Text>Surat Peringatan {history.spKe}</Text>
            <Text>{moment(history.createdAt).format('DD/MM/YYYY')}</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex mr={10} justifyContent={'flex-end'}>
            <Button
              onClick={() => Router.push(`/sp/${siswa?.nis}/${siswa?.namaLengkap}/${history.spKe}`)}
            >
              Unduh SP Disini
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

type Props = {
  siswa: ISiswaDetail;
  history: IHistory;
};

export default SPCard;
