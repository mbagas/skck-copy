import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AdminNavigationBar } from '../navigationBar';

const AdminLayout: React.FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <AdminNavigationBar.TopBar setShow={setShow} />
      <Flex flex={1}>
        <AdminNavigationBar.SideBar show={show} />
        {children}
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
