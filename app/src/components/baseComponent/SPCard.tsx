import React from 'react';
import moment from 'moment';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IHistory } from 'src/utils/interface';

const SPCard: React.FC<Props> = ({ history }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3}>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Flex flexDirection={'column'}>
            <Text>Surat Peringatan {history.spKe}</Text>
            <Text>{moment(history.createdAt).format('DD/MM/YYYY')}</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Button>Unduh SP Disini</Button>
        </GridItem>
      </Grid>
    </Flex>
  );
};

type Props = {
  history: IHistory;
};

export default SPCard;
