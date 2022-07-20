import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import useIdQuery from 'src/utils/useIdQuery';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME, ORDER, USER_ROLE } from 'src/utils/constant';
import {
  getDataById as _getDataById,
  getPelanggaranSiswa as _getPelanggaranSiswa,
  deleteData as _deleteData,
} from 'src/store/actions/resources';
import {
  DashboardContainer,
  DashboardMainContainer,
  PelanggaranCard,
  ProfileCard,
  SPCard,
} from 'src/components/baseComponent';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { getRole } from 'src/utils/sessionUtils';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import { toastfier, errorToastfier } from 'src/utils/toastifier';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { buttonStyle } from 'src/utils/styles';

const SiswaDetailGuru: React.FC<Props> = ({
  getDataById,
  pelanggarans,
  getPelanggarans,
  deletePelanggaran,
}) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswaDetail>();
  const [pelanggaranId, setPelanggaranId] = useState<number>();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isDeleteable, setIsDeleteable] = useState<boolean>(false);
  const [limit] = useState<string | number>('all');

  const closeModal = () => {
    setShowConfirmation(false);
  };

  const onClickDelete = (id: number) => {
    setPelanggaranId(id);
    setShowConfirmation(true);
  };

  const getSiswaData = async () => {
    const data = (await getDataById(RESOURCE_NAME.SISWAS, queryId)) as ISiswaDetail;
    setSiswa(data);
  };

  const onDelete = async () => {
    if (!pelanggaranId) return;

    try {
      // Delete pelaggaran
      await deletePelanggaran(RESOURCE_NAME.PELANGGARANS, pelanggaranId);

      // Update the state by getting new data from the server
      await getSiswaData();
      await getPelanggarans(queryId, `limit=${limit}`);

      toastfier('Pelanggaran berhasil dihapus', { type: 'success' });
    } catch (err) {
      errorToastfier(err);
    }

    setShowConfirmation(false);
  };

  useEffect(() => {
    const role = getRole();

    switch (role) {
      case USER_ROLE.GURU:
        setIsDeleteable(true);
        break;
      case USER_ROLE.ORANG_TUA:
        setIsDeleteable(false);
        break;
      default:
        Router.push('/404');
        break;
    }
  }, []);

  useCustomDebounce(
    async () => {
      if (!queryId) return;

      await getSiswaData();

      await getPelanggarans(queryId, `limit=${limit}`);
    },
    500,
    [queryId]
  );

  return (
    <React.Fragment>
      <DashboardMainContainer>
        {siswa ? (
          <Flex flexDirection="column" width={'100%'} height={'100%'}>
            <DashboardContainer
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
              padding={3}
            >
              <Flex flexDirection={'column'} width={'100%'} height={'100%'}>
                <ProfileCard siswa={siswa} />
                <Flex flexDirection="column" mt={5} px={2} flex={1}>
                  {!_.isEmpty(_.get(siswa, 'histories', [])) && (
                    <React.Fragment>
                      <Text boxShadow={'lg'} borderBottom={'1px solid black'}>
                        History Surat Peringatan
                      </Text>
                      {_.map(siswa?.histories, (history, index) => (
                        <SPCard siswa={siswa} history={history} key={index} />
                      ))}
                    </React.Fragment>
                  )}
                  <Text boxShadow={'lg'} borderBottom={'1px solid black'} pt={3}>
                    History Pelanggaran
                  </Text>
                  {_.map(pelanggarans.rows, (pelanggaran, index) => (
                    <PelanggaranCard
                      pelanggaran={pelanggaran}
                      deleteAble={isDeleteable}
                      onClickDelete={onClickDelete}
                      key={index}
                    />
                  ))}
                </Flex>
                <Flex py={3} px={2}>
                  {isDeleteable && (
                    <Button
                      {...buttonStyle.confirmation}
                      width={{ base: '100%', md: 'auto' }}
                      onClick={() => Router.push(`/${queryId}/create`)}
                    >
                      Tambah
                    </Button>
                  )}
                </Flex>
              </Flex>
            </DashboardContainer>
          </Flex>
        ) : null}
      </DashboardMainContainer>
      <DeleteConfirmationModal isOpen={showConfirmation} onSubmit={onDelete} onClose={closeModal} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getPelanggaransOrdered(ORDER.ASC)(state),
});

const connector = connect(mapStateToProps, {
  getDataById: _getDataById,
  getPelanggarans: _getPelanggaranSiswa,
  deletePelanggaran: _deleteData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SiswaDetailGuru);
