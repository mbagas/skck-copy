import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';
import AdminContainer from '../AdminContainer';
import useIdQuery from 'src/utils/useIdQuery';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME } from 'src/utils/constant';
import { getDataById as _getDataById } from 'src/store/actions/resources';
import { ProfileCard } from 'src/components/baseComponent';

const LaporanSiswaCreate: React.FC<Props> = ({ getDataById }) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswaDetail>();

  useEffect(() => {
    (async () => {
      const data = (await getDataById(RESOURCE_NAME.SISWAS, queryId)) as unknown as ISiswaDetail;
      setSiswa(data);
    })();
  }, []);

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      <Flex flexDirection="column" width="100%">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Buat Laporan
        </Text>
      </Flex>
      <AdminContainer>
        <ProfileCard siswa={siswa} />
      </AdminContainer>
    </Flex>
  );
};

const connector = connect(null, {
  getDataById: _getDataById,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LaporanSiswaCreate);
