/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import {
  getDataById as _getDataById,
  getPelanggaranSiswa as _getPelanggaranSiswa,
} from 'src/store/actions/resources';
import {
  DashboardContainer,
  DashboardMainContainer,
  PelanggaranCard,
  ProfileCard,
  SPCard,
} from 'src/components/baseComponent';
import useCustomDebounce from 'src/utils/useCustomDebounce';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { buttonStyle } from 'src/utils/styles';
import { getAccountId } from 'src/utils/sessionUtils';

const SiswaView: React.FC<Props> = ({ getDataById, pelanggarans, getPelanggarans }) => {
  const [siswaId, setSiswaId] = useState<number>(0);
  const [siswa, setSiswa] = useState<ISiswaDetail>();
  const [limit] = useState<number>(5);

  const getSiswaData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = (await getDataById(RESOURCE_NAME.SISWAS, siswaId)) as ISiswaDetail;
    setSiswa(data);
  };

  useEffect(() => {
    setSiswaId(getAccountId()!);
  }, []);

  useCustomDebounce(
    async () => {
      if (!siswaId) return;

      await getSiswaData();

      await getPelanggarans(siswaId, `limit=${limit}`);
    },
    500,
    [siswaId]
  );

  return (
    <React.Fragment>
      <DashboardMainContainer>
        {siswa ? (
          <Flex flexDirection="column" width={'100%'} height={'100%'}>
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={2}>
              Buat Laporan
            </Text>
            <DashboardContainer
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
              pb={10}
            >
              <Flex flexDirection={'column'} width={'95%'} height={'95%'}>
                <ProfileCard siswa={siswa} />
                <Flex flexDirection="column" mt={5} px={2}>
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
                    <PelanggaranCard pelanggaran={pelanggaran} deleteAble={false} key={index} />
                  ))}
                </Flex>
                <Flex py={3} px={2}>
                  <Button
                    {...buttonStyle.confirmation}
                    width={{ base: '100%', md: 'auto' }}
                    onClick={() => Router.push(`${Router.pathname}/create`)}
                  >
                    Tambah
                  </Button>
                </Flex>
              </Flex>
            </DashboardContainer>
          </Flex>
        ) : null}
      </DashboardMainContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getResourceOrder(state, ORDER.ASC),
});

const connector = connect(mapStateToProps, {
  getDataById: _getDataById,
  getPelanggarans: _getPelanggaranSiswa,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SiswaView);
