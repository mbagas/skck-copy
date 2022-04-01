import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const DashboardMainContainer: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      bg="royalGray.100"
      width={'100%'}
      height={'100%'}
      p={3}
      flexDirection={'column'}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default DashboardMainContainer;
