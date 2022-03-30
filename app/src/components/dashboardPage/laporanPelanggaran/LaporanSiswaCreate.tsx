import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';
import useIdQuery from 'src/utils/useIdQuery';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  getAllData as _getAllData,
  getDataById as _getDataById,
} from 'src/store/actions/resources';
import { DashboardContainer, ProfileCard, FormPelanggaranCard } from 'src/components/baseComponent';
import useCustomDebounce from 'src/utils/useCustomDebounce';

const LaporanSiswaCreate: React.FC<Props> = ({ getDataById, getAllData }) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswaDetail>();

  useEffect(() => {
    (async () => {
      // Get all kategori
      await getAllData(RESOURCE_NAME.KATEGORI_PELANGGARANS, 'limit=all');
    })();
  }, []);

  useCustomDebounce(
    async () => {
      if (!queryId) return;

      const data = (await getDataById(RESOURCE_NAME.SISWAS, queryId)) as ISiswaDetail;
      setSiswa(data);
    },
    500,
    [queryId]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.00'} flexDirection={'column'}>
      <Flex flexDirection="column" width="100%">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Buat Laporan
        </Text>
      </Flex>
      {siswa ? (
        <DashboardContainer flexDirection={'column'}>
          <ProfileCard siswa={siswa} />
          <FormPelanggaranCard />
        </DashboardContainer>
      ) : null}
    </Flex>
  );
};

const connector = connect(null, {
  getDataById: _getDataById,
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LaporanSiswaCreate);
