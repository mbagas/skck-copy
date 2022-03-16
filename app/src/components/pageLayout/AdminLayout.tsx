import React from 'react';
import { Flex } from '@chakra-ui/react';
import NavigationBar from '../navigationBar';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <NavigationBar.AdminNavigationBar.TopBar />
      <Flex height={{ base: 'calc(100% - 6rem)', md: 'calc(100% - 8rem)' }}>{children}</Flex>
    </Flex>
  );
};

export default AdminLayout;
