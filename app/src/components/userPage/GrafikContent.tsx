import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { IGrafiks } from 'src/utils/interface';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';
import {
  DashboardContainer,
  DashboardMainContainer,
  GrafikBar,
  GrafikTimeSeries,
} from '../baseComponent';

const GrafikContent: React.FC<Props> = ({ getGrafik }) => {
  const [grafik, setGrafik] = useState<IGrafiks>();

  useEffect(() => {
    (async () => {
      setGrafik(await getGrafik());
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardMainContainer>
      <DashboardContainer flexDirection={'column'} height={'100%'}>
        <Flex
          flexDirection="column"
          alignItems="center"
          p={{ base: 2, md: 10 }}
          width={'100%'}
          height={'100%'}
        >
          <Flex width={'100%'}>
            <Text>Grafik Pelanggaran</Text>
          </Flex>
          <Flex width={'100%'} height={'100%'}>
            <GrafikTimeSeries grafik={grafik} />
          </Flex>
          <Flex width={'100%'} height={'100%'}>
            <GrafikBar grafik={grafik} />
          </Flex>
        </Flex>
      </DashboardContainer>
    </DashboardMainContainer>
  );
};

const connector = connect(null, { getGrafik: _getGrafik });

type Props = ConnectedProps<typeof connector>;

export default connector(GrafikContent);
