import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { UserNavigationBar } from '../navigationBar';

const UserLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <UserNavigationBar.TopBar canCreate={false} />
      <Grid
        templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(12,1fr)' }}
        height={{ base: 'calc(100% - 6rem)', md: 'calc(100% - 8rem)' }}
      >
        <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
        <GridItem colSpan={{ base: 1, md: 6 }} width={'100%'}>
          <Flex flex={1} px={2}>
            {children}
          </Flex>
          <Flex display={{ base: 'flex', md: 'none' }}>
            <UserNavigationBar.BottomBar canCreate={true} isOnCreate={false} />
          </Flex>
        </GridItem>
        <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
      </Grid>
    </Flex>
  );
};

export default UserLayout;
