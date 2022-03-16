import React from 'react';
import { Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import useBasePath from 'src/utils/useBasePath';

const BaseTopBar: React.FC = ({ children }) => {
  const basePath = useBasePath();

  const aliceText = {
    fontFamily: 'Alice',
    fontSize: {
      base: '1rem',
      lg: '1.2rem',
    },
  };

  const poppinsText = (isYellow = true) => ({
    ...(isYellow ? { color: 'textLogin.SMA' } : {}),
    fontFamily: 'Poppins',
    fontSize: {
      base: '0.85rem',
      lg: '1.1rem',
    },
  });

  return (
    <Flex
      align="center"
      wrap="wrap"
      px={4}
      py={2}
      color="white"
      bgColor={'royalBlack.100'}
      userSelect="none"
      height={{ base: '6rem', md: '8rem' }}
    >
      <Flex>
        <Flex align="center" mr={5}>
          <Image
            borderRadius="full"
            src={`${basePath}/logo.png`}
            alt="Logo"
            width={{ base: 70, lg: 75 }}
            height={{ base: 70, lg: 75 }}
          />
        </Flex>
        <VStack alignItems="left">
          <Text {...poppinsText(false)}>SISTEM INFORMASI PENCATATAN PELANGGARAN</Text>
          <Text {...aliceText}>SMAN 1 BUKITTINGGI</Text>
          <Text {...poppinsText()}>SMAN 1 UNGGUL BUKITTINGGI</Text>
        </VStack>
      </Flex>
      <Spacer />
      <Flex>
        <Flex display={{ base: 'none', md: 'flex' }}>{children}</Flex>
        <VscSettingsGear />
        <VscSignOut />
      </Flex>
    </Flex>
  );
};

export default BaseTopBar;
