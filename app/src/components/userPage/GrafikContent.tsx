import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import useIdQuery from 'src/utils/useIdQuery';
import { IGrafiks, ISiswaDetail } from 'src/utils/interface';
import { RESOURCE_NAME, ORDER } from 'src/utils/constant';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';
import { resources } from 'src/store/selectors';
import { type } from 'os';
import moment from 'moment';
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
  }, []);

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
          <Flex width={'100%'} height={'100%'}>
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
