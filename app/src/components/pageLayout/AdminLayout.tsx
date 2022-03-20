import React from 'react';
import { Flex } from '@chakra-ui/react';
import { AdminNavigationBar } from '../navigationBar';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <AdminNavigationBar.TopBar />
      <Flex height={'100%'}>{children}</Flex>
    </Flex>
  );
};

export default AdminLayout;
