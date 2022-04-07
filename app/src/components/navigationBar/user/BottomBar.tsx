import _ from 'lodash';
import React from 'react';
import Router from 'next/router';
import { AspectRatio, Flex, Grid, GridItem } from '@chakra-ui/react';
import { VscHome, VscGraph, VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { removeToken } from 'src/utils/sessionUtils';

const BottomBar: React.FC = () => {
  return (
    <Flex bg={'white'} overflow="visible" bottom={0} width={'100%'} py={3}>
      <Grid templateColumns={'repeat(4, 1fr)'} gap={4} width={'100%'} position={'relative'}>
        <GridItem onClick={() => Router.push('/')}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              <VscHome />
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem onClick={() => Router.push('/grafik')}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              <VscGraph />
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem onClick={() => Router.push('/settings')}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              <VscSettingsGear />
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem
          onClick={() => {
            removeToken();
            Router.push('/');
          }}
        >
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              <VscSignOut />
            </AspectRatio>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default BottomBar;
