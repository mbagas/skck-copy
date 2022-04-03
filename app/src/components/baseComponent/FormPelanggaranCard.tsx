import React, { useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Grid } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/store';
import { createPelanggarans as _createPelanggarans } from 'src/store/actions/resources';
import { RESOURCE_NAME } from 'src/utils/constant';
import { ListPelanggaran } from 'src/components/baseComponent';
import { resources } from 'src/store/selectors';
import { errorToastfier, toastfier } from 'src/utils/toastifier';
import { ISiswaDetail } from 'src/utils/interface';
import { getRole } from 'src/utils/sessionUtils';
import { USER_ROLE } from 'src/utils/constant';

const FormPelanggaranCard: React.FC<Props> = ({ siswa, kategoris, createPelanggarans }) => {
  const [checked, setChecked] = useState<Record<number, number>>({});
  const [isRequested, setIsRequested] = useState<boolean>(false);

  // e => Input Event
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // name => Name of the input
    const name = e.target.name;
    // temp => Clone current checked data
    const temp = _.cloneDeep(checked);

    // If its check, delete the data
    if (_.get(checked, name) && name) {
      delete temp[+name];
    } else {
      // If its uncheck, add the data
      temp[+name] = +name;
    }

    // Update state
    setChecked(temp);
  };

  const onSubmit = async () => {
    if (_.isEmpty(checked)) return;

    setIsRequested(true);

    try {
      await createPelanggarans(siswa.id, _.values(checked));
      return setTimeout(() => {
        toastfier('Berhasil menambahkan laporan', { type: 'success' });

        const role = getRole();

        if (role === USER_ROLE.ADMIN) return Router.push(`/dashboard/laporans`);
        if (role === USER_ROLE.SISWA) return Router.push('/');
        return Router.push(`/${Router.query.id!}`);
      }, 3000);
    } catch (e) {
      errorToastfier(e);
    }

    setIsRequested(false);
  };

  return (
    <Flex
      flexDirection={'column'}
      alignItems="center"
      borderRadius={15}
      py={3}
      p={3}
      my={6}
      mx={6}
      boxShadow="lg"
      flex={1}
    >
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
        gap={5}
        width={'100%'}
        flex={1}
      >
        {_.map(kategoris.rows, (kategori, key) => (
          <ListPelanggaran kategori={kategori} key={key} onChange={onChange} checked={checked} />
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
        onClick={onSubmit}
        disabled={isRequested}
      >
        Submit
      </Button>
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  kategoris: resources.getResource(state, RESOURCE_NAME.KATEGORI_PELANGGARANS),
});

const connector = connect(mapStateToProps, {
  createPelanggarans: _createPelanggarans,
});

type Props = ConnectedProps<typeof connector> & {
  siswa: ISiswaDetail;
};

export default connector(FormPelanggaranCard);
