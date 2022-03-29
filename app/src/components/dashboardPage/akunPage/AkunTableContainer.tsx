import React from 'react';
import { Flex } from '@chakra-ui/react';

const AkunTableContainer: React.FC = ({ children }) => {
  return (
    <Flex
      bg="white"
      width={'100%'}
      height={'100%'}
      borderRadius={25}
      flexDirection={'column'}
      px={10}
    >
      {children}
    </Flex>
  );
};

export default AkunTableContainer;
