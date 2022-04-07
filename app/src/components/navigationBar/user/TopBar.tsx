import React from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { AspectRatio, Flex, HStack } from '@chakra-ui/react';
import BaseTopBar from 'src/components/baseComponent/BaseTopBar';
import { VscHome, VscGraph, VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { BsGearFill } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { GoGraph } from 'react-icons/go';
import { removeToken } from 'src/utils/sessionUtils';

const TopBar: React.FC = () => {
  const router = useRouter();

  const inHome = () => {
    const pathname = router.pathname;

    return !_.includes(pathname, '/grafik') && !_.includes(pathname, '/settings');
  };

  const inGraph = () => {
    const pathname = router.pathname;

    return _.includes(pathname, '/grafik');
  };

  const inSettings = () => {
    const pathname = router.pathname;

    return _.includes(pathname, '/settings');
  };

  return (
    <BaseTopBar>
      <HStack spacing={10} display={{ base: 'none', md: 'flex' }}>
        <Flex _hover={{ color: 'royalRed.100' }} color={'royalRed.200'}>
          <AspectRatio ratio={1} width={6} onClick={() => router.push('/')}>
            {inHome() ? <HiHome /> : <VscHome />}
          </AspectRatio>
        </Flex>
        <Flex _hover={{ color: 'royalRed.100' }} color={'royalRed.200'}>
          <AspectRatio ratio={1} width={6} onClick={() => router.push('/grafik')}>
            {inGraph() ? <GoGraph /> : <VscGraph />}
          </AspectRatio>
        </Flex>
        <Flex _hover={{ color: 'royalRed.100' }} color={'royalRed.200'}>
          <AspectRatio ratio={1} width={6} onClick={() => router.push('/settings')}>
            {inSettings() ? <BsGearFill /> : <VscSettingsGear />}
          </AspectRatio>
        </Flex>
        <Flex _hover={{ color: 'royalRed.100' }} color={'royalRed.200'}>
          <AspectRatio
            ratio={1}
            width={6}
            onClick={() => {
              removeToken();
              router.push('/');
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
