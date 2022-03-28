import React from 'react';
import { Flex } from '@chakra-ui/react';

const AdminContainer: React.FC = ({ children }) => {
  return (
    <Flex bg={'white'} width={'100%'} height={'100%'} borderRadius={25}>
      {children}
    </Flex>
  );
};

export default AdminContainer;
