import React, { createRef, useEffect } from 'react';
import { AspectRatio, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import useBasePath from 'src/utils/useBasePath';

const BaseTopBar: React.FC = ({ children }) => {
  const basePath = useBasePath();
  const topBarRef = createRef<HTMLDivElement>();

  useEffect(() => {
    localStorage.setItem('top_bar_height', `${topBarRef.current?.scrollHeight}`);
  }, []); // eslint-disable-line

  const aliceText = {
    fontFamily: 'Alice',
    fontSize: {
      base: '0.6rem',
      sm: '0.7rem',
      md: '0.9rem',
    },
  };

  const poppinsText = (isYellow = true) => ({
    ...(isYellow ? { color: 'textLogin.SMA' } : {}),
    fontFamily: 'Poppins',
    fontSize: {
      base: '0.5rem',
      sm: '0.6rem',
      md: '0.8rem',
    },
  });

  return (
    <Flex
      alignItems="center"
      px={4}
      py={2}
      color="white"
      bgColor={'royalBlack.100'}
      userSelect="none"
      ref={topBarRef}
    >
      <Flex alignItems="center">
        <Flex align="center" mr={5}>
          <AspectRatio ratio={1} width={{ base: '50px', sm: '65px', md: '75px' }}>
            <Image borderRadius="full" src={`${basePath}/logo.png`} alt="Logo" />
          </AspectRatio>
        </Flex>
        <VStack spacing={0} alignItems="left">
          <Text {...poppinsText(false)}>SISTEM INFORMASI PENCATATAN PELANGGARAN</Text>
          <Text {...aliceText}>SMAN 1 BUKITTINGGI</Text>
          <Text {...poppinsText()}>SMAN 1 UNGGUL BUKITTINGGI</Text>
        </VStack>
      </Flex>
      <Spacer />
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default BaseTopBar;
