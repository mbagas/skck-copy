import React from 'react';
import { Flex, Center, Button, Text } from '@chakra-ui/react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      textAlign="center"
      justifyContent={'center'}
      alignItems="center"
    >
      <Text color={'royalBlue.100'} _hover={{ color: 'royalBlue.200' }}>
        Testing
      </Text>
      {children}
    </Flex>
  );
};

export default MainLayout;
