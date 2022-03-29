import React from 'react';
import _ from 'lodash';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { RootState } from 'src/store';
import { connect, ConnectedProps } from 'react-redux';
import { RESOURCE_NAME } from 'src/utils/constant';
import { ListPelanggaran } from 'src/components/baseComponent';
import { resources } from 'src/store/selectors';

const FormPelanggaranCard: React.FC<Props> = ({ kategoris }) => {
  return (
    <Flex borderRadius={25} alignItems="center" position={'relative'} py={3}>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }} gap={4}>
        {_.map(kategoris.rows, (kategori, key) => (
          <ListPelanggaran kategori={kategori} key={key} />
        ))}
      </Grid>
      <Button
        fontFamily="poppins"
        fontSize={'0.813rem'}
        px={10}
        borderRadius={6}
        color="white"
        bg={'royalRed.200'}
        _hover={{
          background: 'royalRed.300',
        }}
        _focus={{ border: 'none' }}
      >
        Submit
      </Button>
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  kategoris: resources.getResource(state, RESOURCE_NAME.KATEGORI_PELANGGARANS),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(FormPelanggaranCard);
