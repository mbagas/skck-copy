import React from 'react';
import _ from 'lodash';
import { Flex } from '@chakra-ui/react';
import { IGrafiks } from 'src/utils/interface';
import { GrafikBar, GrafikTimeSeries } from '../baseComponent';

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

type Props = { grafik?: IGrafiks };

export default Grafik;
