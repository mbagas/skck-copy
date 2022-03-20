import React from 'react';
import { AspectRatio, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import useBasePath from 'src/utils/useBasePath';

const BaseTopBar: React.FC = ({ children }) => {
  const basePath = useBasePath();

  const aliceText = {
    fontFamily: 'Alice',
    fontSize: {
      base: '0.6rem',
      sm: '0.8rem',
      md: '1rem',
    },
  };

  const poppinsText = (isYellow = true) => ({
    ...(isYellow ? { color: 'textLogin.SMA' } : {}),
    fontFamily: 'Poppins',
    fontSize: {
      base: '0.5rem',
      sm: '0.7rem',
      md: '0.9rem',
    },
  });

  return (
    <Flex
      alignItems="center"
      px={4}
      py={4}
      color="white"
      bgColor={'royalBlack.100'}
      userSelect="none"
    >
      <Flex alignItems="center">
        <Flex align="center" mr={5}>
          <AspectRatio ratio={1} width={{ base: '50px', sm: '75px', md: '85px' }}>
            <Image borderRadius="full" src={`${basePath}/logo.png`} alt="Logo" />
          </AspectRatio>
        </Flex>
        <VStack alignItems="left">
          <Text {...poppinsText(false)}>SISTEM INFORMASI PENCATATAN PELANGGARAN</Text>
          <Text {...aliceText}>SMAN 1 BUKITTINGGI</Text>
          <Text {...poppinsText()}>SMAN 1 UNGGUL BUKITTINGGI</Text>
        </VStack>
      </Flex>
      <Spacer />
      <Flex display={{ base: 'none', md: 'flex' }}>{children}</Flex>
    </Flex>
  );
};

export default BaseTopBar;
