import React from 'react';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

const OverviewContainer: React.FC = () => {
  return (
    <Flex width={'100%'} height={'100%'} bg={'white'} borderRadius={25}>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} px={5} py={5}>
        Data Kategori Pelanggaran Harian
      </Text>
      <canvas></canvas>
    </Flex>
  );
};

export default OverviewContainer;
