import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';
import useIdQuery from 'src/utils/useIdQuery';
import { RESOURCE_NAME } from 'src/utils/constant';
import { getAllData as _getAllData } from 'src/store/actions/resources';
import {
  DashboardContainer,
  DashboardMainContainer,
  ProfileCard,
  FormPelanggaranCard,
} from 'src/components/baseComponent';
import useGetDataById from 'src/utils/useGetDataById';

const LaporanContent: React.FC<Props> = ({ getAllData }) => {
  const queryId = useIdQuery();
  const siswa = useGetDataById(RESOURCE_NAME.SISWAS, queryId);

  useEffect(() => {
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

export default connector(LaporanContent);
