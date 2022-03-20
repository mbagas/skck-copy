import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const OverviewContainer: React.FC = () => {
  return (
    <Flex bg={'white'} width={'100%'} height={'100%'} borderRadius={25}>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} px={5} py={5}>
        Data Kategori Pelanggaran Harian
      </Text>
    </Flex>
  );
};

export default OverviewContainer;
