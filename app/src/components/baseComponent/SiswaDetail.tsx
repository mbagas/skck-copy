import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import useIdQuery from 'src/utils/useIdQuery';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import {
  getDataById as _getDataById,
  getPelanggaranSiswa as _getPelanggaranSiswa,
  deleteData as _deleteData,
} from 'src/store/actions/resources';
import {
  DashboardContainer,
  PelanggaranCard,
  ProfileCard,
  SPCard,
} from 'src/components/baseComponent';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { canDelete } from 'src/utils/sessionUtils';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toastfier, errorToastfier } from 'src/utils/toastifier';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';

const SiswaDetail: React.FC<Props> = ({
  getDataById,
  pelanggarans,
  getPelanggarans,
  deletePelanggaran,
}) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswaDetail>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [pelanggaranId, setPelanggaranId] = useState<number>();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isDeleteable, setIsDeleteable] = useState<boolean>(false);
  const [limit] = useState<number>(5);

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
    setIsDeleteable(canDelete());
  }, []);

  useCustomDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [siswa]
  );

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
      <Flex
        px={3}
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'royalGray.100'}
      >
        {isLoaded ? (
          <Flex flexDirection="column" width={'100%'} height={'100%'}>
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={2}>
              Buat Laporan
            </Text>
            <DashboardContainer justifyContent={'center'} alignItems={'center'}>
              <Flex flexDirection={'column'} width={'95%'} height={'95%'}>
                <ProfileCard siswa={siswa} />
                <Flex flexDirection="column" flex={1} mt={5}>
                  {!_.isEmpty(_.get(siswa, 'histories', [])) && (
                    <Flex flexDirection="column" width={'100%'} mb={5}>
                      <Flex>
                        <Text boxShadow={'lg'} borderBottom={'1px solid black'}>
                          History Surat Peringatan
                        </Text>
                      </Flex>
                      {_.map(siswa?.histories, (history, index) => (
                        <SPCard history={history} key={index} />
                      ))}
                    </Flex>
                  )}
                  <Flex>
                    <Text boxShadow={'lg'} borderBottom={'1px solid black'}>
                      History Pelanggaran
                    </Text>
                  </Flex>
                  <Flex overflow={'auto'} flexDirection={'column'} px={2}>
                    {_.map(pelanggarans.rows, (pelanggaran, index) => (
                      <PelanggaranCard
                        pelanggaran={pelanggaran}
                        deleteAble={isDeleteable}
                        onClickDelete={onClickDelete}
                        key={index}
                      />
                    ))}
                  </Flex>
                </Flex>
                <Flex py={3} px={2}>
                  <Button
                    bg="royalRed.200"
                    color="white"
                    _hover={{
                      background: 'royalRed.300',
                    }}
                    width={{ base: '100%', md: 'auto' }}
                    onClick={() =>
                      Router.push({
                        pathname: `${Router.pathname}/create`,
                        query: {
                          id: queryId,
                        },
                      })
                    }
                  >
                    Tambah
                  </Button>
                </Flex>
              </Flex>
            </DashboardContainer>
          </Flex>
        ) : null}
      </Flex>
      <DeleteConfirmationModal isOpen={showConfirmation} onSubmit={onDelete} onClose={closeModal} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getResourceOrder(state, ORDER.DESC),
});

const connector = connect(mapStateToProps, {
  getDataById: _getDataById,
  getPelanggarans: _getPelanggaranSiswa,
  deletePelanggaran: _deleteData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SiswaDetail);
