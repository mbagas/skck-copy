import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { UserNavigationBar } from '../navigationBar';

const UserLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'} bg="royalGray.100">
      <UserNavigationBar.TopBar />
      <Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(12,1fr)' }} height={'100%'}>
        <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
        <GridItem colSpan={{ base: 1, md: 6 }} width={'100%'}>
          <Flex height={'100%'} overflow={'auto'}>
            {children}
          </Flex>
        </GridItem>
        <GridItem colSpan={3} display={{ base: 'none', md: 'inline' }} width={'100%'} />
      </Grid>
      <Flex display={{ base: 'flex', md: 'none' }}>
        <UserNavigationBar.BottomBar />
      </Flex>
    </Flex>
  );
};

export default UserLayout;
