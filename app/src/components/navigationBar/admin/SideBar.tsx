import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Flex,
  VStack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { GoSignOut } from 'react-icons/go';
import { FaUser, FaHome, FaChartBar } from 'react-icons/fa';
import { RiAddCircleFill, RiBook2Fill } from 'react-icons/ri';
import { USER_ROLE } from 'src/utils/constant';
import { removeToken } from 'src/utils/sessionUtils';

const SideBar: React.FC<Props> = ({ show }) => {
  const router = useRouter();
  const [decreasor, setDecreasor] = useState<string>();
  const [isOnBase] = useMediaQuery(['(max-width: 48em)', '(min-width: 48em)']);

  const isActive = {
    fontWeight: 'bold',
    color: 'royalRed.200',
  };

  useEffect(() => {
    setDecreasor(localStorage.getItem('top_bar_height')!); // eslint-disable-line
  }, []);

  const generateAccordion = () =>
    _.map(USER_ROLE, (role, key) => {
      const resource = role.split('_');

      return (
        <Text
          cursor={'pointer'}
          padding={3}
          key={key}
          _hover={{ color: 'royalRed.100' }}
          onClick={() => router.push(`/dashboard/akun/${resource.join('-')}s`)}
        >
          {_.map(resource, (r) => _.capitalize(r)).join(' ')}
        </Text>
      );
    });

  return (
    <Flex
      height={{ base: `calc(100vh - ${decreasor}px)`, md: '100%' }}
      width={{ base: '100%', md: '20rem' }}
      mr={{ base: 0, md: 5 }}
      position={{
        base: 'absolute',
        md: 'relative',
      }}
      bg="white"
      {...(isOnBase && { left: show ? 0 : '-100%' })}
      zIndex={5}
    >
      <VStack spacing={5} alignItems={'flex-start'} py={4} px={5} width={'100%'} height={'100%'}>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/dashboard')}
          _hover={{ color: 'royalRed.100' }}
          {...(router.pathname === '/dashboard' && isActive)}
        >
          <AspectRatio ratio={1} width={8} mr={2}>
            <FaHome />
          </AspectRatio>
          <Text>Dashboard</Text>
        </Flex>
        <Accordion allowMultiple width={'100%'}>
          <AccordionItem border={'none'}>
            <AccordionButton padding={0}>
              <Flex
                width={'90%'}
                alignItems={'center'}
                userSelect={'none'}
                _hover={{ color: 'royalRed.100' }}
                {...(_.includes(router.pathname, '/dashboard/akun') && isActive)}
              >
                <AspectRatio ratio={1} width={8} mr={2}>
                  <FaUser />
                </AspectRatio>
                <Text>Akun</Text>
              </Flex>
            </AccordionButton>
            <AccordionPanel>{generateAccordion()}</AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/dashboard/laporans')}
          _hover={{ color: 'royalRed.100' }}
          {...(_.includes(router.pathname, '/dashboard/laporans') && isActive)}
        >
          <AspectRatio justifyContent={'flex-start'} ratio={1} width={8} mr={2}>
            <RiAddCircleFill />
          </AspectRatio>
          <Text>Laporan</Text>
        </Flex>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('dashboard/kategori-pelanggarans')}
          _hover={{ color: 'royalRed.100' }}
          {...(_.includes(router.pathname, '/dashboard/kategori-pelanggarans') && isActive)}
        >
          <AspectRatio ratio={1} width={8} mr={2}>
            <RiBook2Fill />
          </AspectRatio>
          <Text>Kategori Pelanggaran</Text>
        </Flex>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => {
            removeToken();
            router.push('/login');
          }}
          _hover={{ color: 'royalRed.100' }}
        >
          <AspectRatio justifyContent={'center'} ratio={1} width={8} mr={3}>
            <GoSignOut />
          </AspectRatio>
          <Text>Keluar</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

type Props = {
  show: boolean;
};

export default SideBar;
