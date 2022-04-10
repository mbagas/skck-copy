/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import {
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
import { getAccountId } from 'src/utils/sessionUtils';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { buttonStyle } from 'src/utils/styles';
import useGetDataById from 'src/utils/useGetDataById';

const SiswaDetailSiswa: React.FC<Props> = ({ pelanggarans, getPelanggarans }) => {
  const [siswaId, setSiswaId] = useState<number>(0);
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, siswaId);
  const [limit] = useState<string | number>('all');

  useEffect(() => {
    setSiswaId(getAccountId()!);

    (async () => {
      await getPelanggarans(getAccountId()!, `limit=${limit}`);
    })();
  }, []); // eslint-disable-line

  return (
    <DashboardMainContainer>
      {siswa ? (
        <Flex flexDirection="column" width={'100%'} height={'100%'}>
          <DashboardContainer
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            padding={3}
          >
            <Flex flexDirection={'column'}>
              <ProfileCard siswa={siswa} />
              <Flex flexDirection="column" mt={5} px={2} flex={1}>
                {!_.isEmpty(_.get(siswa, 'histories', [])) && (
                  <React.Fragment>
                    <Text boxShadow={'lg'} borderBottom={'1px solid black'}>
                      History Surat Peringatan
                    </Text>
                    {_.map(siswa?.histories, (history, index) => (
                      <SPCard history={history} key={index} />
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
  );
};

const mapStateToProps = (state: RootState) => ({
  pelanggarans: resources.getResourceOrder(state, ORDER.ASC),
});

const connector = connect(mapStateToProps, {
  getPelanggarans: _getPelanggaranSiswa,
  deletePelanggaran: _deleteData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SiswaDetailSiswa);
