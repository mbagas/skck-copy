import React from 'react';
import { Flex } from '@chakra-ui/react';
import { AdminNavigationBar } from '../navigationBar';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <AdminNavigationBar.TopBar />
      <Flex width={'100%'} height={'100%'}>
        <AdminNavigationBar.SideBar />
        <Flex width={'100%'} height={'100%'}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
