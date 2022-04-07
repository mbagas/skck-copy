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
import Router from 'next/router';
import { USER_ROLE } from 'src/utils/constant';
import { GoSignOut } from 'react-icons/go';
import { FaUser, FaHome, FaChartBar } from 'react-icons/fa';
import { RiAddCircleFill, RiBook2Fill } from 'react-icons/ri';

const SideBar: React.FC<Props> = ({ show }) => {
  const [decreasor, setDecreasor] = useState<string>();
  const [isOnBase] = useMediaQuery(['(max-width: 48em)', '(min-width: 48em)']);

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
          onClick={() => Router.push(`/dashboard/akun/${resource.join('-')}s`)}
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
          onClick={() => Router.push('/dashboard')}
        >
          <AspectRatio ratio={1} width={8} mr={2}>
            <FaHome />
          </AspectRatio>
          <Text>Dashboard</Text>
        </Flex>
        <Accordion allowMultiple width={'100%'}>
          <AccordionItem border={'none'}>
            <AccordionButton padding={0}>
              <Flex width={'90%'} alignItems={'center'} userSelect={'none'}>
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
          onClick={() => Router.push('/dashboard/laporans')}
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
          onClick={() => Router.push('/grafik')}
        >
          <AspectRatio ratio={1} width={8} mr={2}>
            <FaChartBar />
          </AspectRatio>
          <Text>Grafik Pelanggaran</Text>
        </Flex>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => Router.push('/dashboard/kategori-pelanggarans')}
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
          onClick={() => Router.push('/')}
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
