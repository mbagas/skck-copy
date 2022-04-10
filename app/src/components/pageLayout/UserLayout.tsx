import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { UserNavigationBar } from '../navigationBar';

const UserLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const [isRiwayat, setIsRiwayat] = useState<boolean>(false);

  const Children = () => <Flex height={'100%'}>{children}</Flex>;

  useEffect(() => {
    const pathname = router.pathname;
    const riwayat = pathname.split('/').pop();

    setIsRiwayat(_.includes(riwayat, 'riwayat'));
  }, []); // eslint-disable-line

  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'} bg="royalGray.100">
      <UserNavigationBar.TopBar />
      {isRiwayat ? (
        <Children />
      ) : (
        <Grid
          templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(12,1fr)' }}
          flex={1}
          overflow={'auto'}
        >
          <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
          <GridItem colSpan={{ base: 1, md: 6 }} width={'100%'}>
            <Children />
          </GridItem>
          <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
        </Grid>
      )}
      <Flex display={{ base: 'flex', md: 'none' }}>
        <UserNavigationBar.BottomBar />
      </Flex>
    </Flex>
  );
};

export default UserLayout;
