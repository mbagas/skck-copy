import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Flex, Text, AspectRatio, Grid, GridItem } from '@chakra-ui/react';
import { FaUser, FaCalendarDay, FaListOl } from 'react-icons/fa';
import { RiBook2Fill } from 'react-icons/ri';
import { Card, DashboardContainer } from '../baseComponent';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';
import { connect, ConnectedProps } from 'react-redux';
import { IGrafiks } from 'src/utils/interface';
import { Grafik } from '../baseComponent';

const DashboardContent: React.FC<Props> = ({ getGrafik }) => {
  const [grafik, setGrafik] = useState<IGrafiks>();

  useEffect(() => {
    (async () => {
      setGrafik(await getGrafik());
    })();
  }, []);

  return (
    <Flex
      flexDirection={'column'}
      py={3}
      px={3}
      height={'100%'}
      width={'100vw'}
      bg={'royalGray.100'}
    >
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Dashboard
      </Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} my={3} gap={4}>
        <GridItem colSpan={1}>
          <Card
            bGround="#4F72D9"
            title="JUMLAH SISWA"
            data={_.first(_.get(grafik, 'totalSiswa', []))?.totalSiswa || 0}
          >
            <AspectRatio ratio={1} width={12}>
              <FaUser color="#184ADE" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card
            bGround="#E64839"
            title="TOTAL PELANGGARAN"
            data={_.first(_.get(grafik, 'totalPelanggaran', []))?.total || 0}
          >
            <AspectRatio ratio={1} width={12}>
              <RiBook2Fill color="B91D0E" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card
            bGround="#F4C33D"
            title="JUMLAH PELANGGARAN HARI INI"
            data={_.first(_.get(grafik, 'jumlahPelanggaranToday', []))?.jumlah || 0}
          >
            <AspectRatio ratio={1} width={12}>
              <FaCalendarDay color="D69F08" />
            </AspectRatio>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card
            bGround="#1ECA8B"
            title="PELANGGARAN TERBANYAK"
            data={_.first(_.get(grafik, 'highestPelanggaran', []))?.nama || ''}
          >
            <AspectRatio ratio={1} width={12}>
              <FaListOl color="00965F" />
            </AspectRatio>
          </Card>
        </GridItem>
      </Grid>
      <DashboardContainer flexDirection="column">
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} px={5} py={5}>
          Data Kategori Pelanggaran Harian
        </Text>
        <Grafik grafik={grafik} />
      </DashboardContainer>
    </Flex>
  );
};

const connector = connect(null, { getGrafik: _getGrafik });

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardContent);
