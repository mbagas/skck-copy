import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Router from 'next/router';
import { AdminNavigationBar } from '../navigationBar';
import { getRole } from 'src/utils/sessionUtils';
import { USER_ROLE } from 'src/utils/constant';

const AdminLayout: React.FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const role = getRole();

    if (role !== USER_ROLE.ADMIN) {
      Router.push('/404');
    }
  }, []);

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
