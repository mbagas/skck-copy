import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Flex, Text } from '@chakra-ui/react';
import { IGrafiks, ISiswaDetail } from 'src/utils/interface';
import { getGrafik as _getGrafik } from 'src/store/actions/resources';
import moment from 'moment';
import {
  DashboardContainer,
  DashboardMainContainer,
  GrafikBar,
  GrafikTimeSeries,
} from '../baseComponent';

const Grafik: React.FC<Props> = ({ grafik }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      p={{ base: 2, md: 10 }}
      width={'100%'}
      height={'100%'}
    >
      <Flex width={'100%'} height={'100%'}>
        <GrafikTimeSeries grafik={grafik} />
      </Flex>
      <Flex width={'100%'} height={'100%'}>
        <GrafikBar grafik={grafik} />
      </Flex>
    </Flex>
  );
};

type Props = { grafik: IGrafiks | undefined };
export default Grafik;
