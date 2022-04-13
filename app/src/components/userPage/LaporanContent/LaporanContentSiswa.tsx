/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';
import { getAllData as _getAllData } from 'src/store/actions/resources';
import {
  DashboardContainer,
  DashboardMainContainer,
  ProfileCard,
  FormPelanggaranCard,
} from 'src/components/baseComponent';
import useGetDataById from 'src/utils/useGetDataById';
import { getAccountId, getRole } from 'src/utils/sessionUtils';
import Router from 'next/router';

const LaporanContentSiswa: React.FC<Props> = ({ getAllData }) => {
  const [siswaId, setSiswaId] = useState<number>(0);
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, siswaId);

  useEffect(() => {
    const role = getRole();

    if (role !== USER_ROLE.SISWA) Router.push('/404');

    setSiswaId(getAccountId()!);

    (async () => {
      // Get all kategori
      await getAllData(RESOURCE_NAME.KATEGORI_PELANGGARANS, 'limit=all');
    })();
  }, []); // eslint-disable-line

  return (
    <DashboardMainContainer>
      {siswa ? (
        <DashboardContainer flexDirection={'column'} height={'100%'}>
          <Flex flexDirection="column" width="100%">
            <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
              Form Pelanggaran
            </Text>
          </Flex>
          <ProfileCard siswa={siswa} />
          <FormPelanggaranCard siswa={siswa} />
        </DashboardContainer>
      ) : null}
    </DashboardMainContainer>
  );
};

const connector = connect(null, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LaporanContentSiswa);
