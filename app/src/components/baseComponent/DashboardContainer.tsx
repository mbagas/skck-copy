import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const DashboardContainer: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex bg={'white'} width={'100%'} height={'100%'} borderRadius={25} {...props}>
      {children}
    </Flex>
  );
};

export default DashboardContainer;
