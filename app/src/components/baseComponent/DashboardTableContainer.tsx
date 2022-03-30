import React from 'react';
import { Flex } from '@chakra-ui/react';

const DashboardTableContainer: React.FC = ({ children }) => {
  return (
    <Flex height={'58vh'} width={'100%'} overflow={'overlay'} flexDirection={'column'}>
      {children}
    </Flex>
  );
};

export default DashboardTableContainer;
