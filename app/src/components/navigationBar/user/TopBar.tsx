import React from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { AspectRatio, Flex, HStack } from '@chakra-ui/react';
import BaseTopBar from 'src/components/baseComponent/BaseTopBar';
import { VscHome, VscGraph, VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { removeToken } from 'src/utils/sessionUtils';

const TopBar: React.FC = () => {
  return (
    <BaseTopBar>
      <HStack spacing={10} display={{ base: 'none', md: 'flex' }}>
        <Flex>
          <AspectRatio ratio={1} width={6} onClick={() => Router.push('/')}>
            <VscHome />
          </AspectRatio>
        </Flex>
        <Flex>
          <AspectRatio ratio={1} width={6} onClick={() => Router.push('/grafik')}>
            <VscGraph />
          </AspectRatio>
        </Flex>
        <Flex>
          <AspectRatio ratio={1} width={6} onClick={() => Router.push('/settings')}>
            <VscSettingsGear />
          </AspectRatio>
        </Flex>
        <Flex>
          <AspectRatio
            ratio={1}
            width={6}
            onClick={() => {
              removeToken();
              Router.push('/');
            }}
          >
            <VscSignOut />
          </AspectRatio>
        </Flex>
      </HStack>
    </BaseTopBar>
  );
};

export default TopBar;
