import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';
import AdminContainer from '../AdminContainer';
import useIdQuery from 'src/utils/useIdQuery';
import useDebounce from 'src/utils/useDebounce';
import { ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME } from 'src/utils/constant';
import { getDataById as _getDataById } from 'src/store/actions/resources';
import { ProfileCard } from 'src/components/baseComponent';

const LaporanSiswaContent: React.FC<Props> = ({ getDataById }) => {
  const queryId = useIdQuery();
  const [siswa, setSiswa] = useState<ISiswaDetail>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // useEffect(() => {}, []);

  useDebounce(
    async () => {
      if (!queryId) return;

      // const data = (await getDataById(RESOURCE_NAME.SISWAS, queryId)) as unknown as ISiswaDetail;
      // setSiswa(data);
    },
    500,
    [queryId]
  );

  useDebounce(
    () => {
      setIsLoaded(true);
    },
    500,
    [siswa]
  );

  return (
    <Flex py={3} px={3} height={'100%'} width={'100%'} bg={'royalGray.100'}>
      {isLoaded ? (
        <Flex p={5} m={5} flexDirection={'column'} height={'100%'}>
          <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
            Buat Laporan
          </Text>
          <AdminContainer>
            <Flex p={10} m={5} flexDirection={'column'}>
              <ProfileCard siswa={siswa} />
            </Flex>
          </AdminContainer>
        </Flex>
      ) : null}
    </Flex>
  );
};

const connector = connect(null, {
  getDataById: _getDataById,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LaporanSiswaContent);
