import React from 'react';
import { Flex } from '@chakra-ui/react';

const DashboardTableContainer: React.FC = ({ children }) => {
  return (
    <Flex height={'100%'} width={'100%'} overflow={'auto'} flexDirection={'column'}>
      {children}
    </Flex>
  );
};

export default DashboardTableContainer;
