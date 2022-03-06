import React from 'react';
import { Stack, Flex, Text, Image, Spacer } from '@chakra-ui/react';

const TopBar: React.FC<Props> = ({ children, isLogin }) => {
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
      paddingX={4}
      paddingY={2}
      color="white"
      bgColor={`${isLogin ? 'royalBlack.100' : 'transparent'}`}
      userSelect="none"
      height="8rem"
    >
      <Flex display={{ base: 'none', md: 'flex' }}>
        <Flex align="center" mr={5}>
          <Image
            borderRadius="full"
            src="logo1.png"
            alt="Logo"
            width={{ base: 70, lg: 75 }}
            height={{ base: 70, lg: 75 }}
          />
        </Flex>
        <Stack display={'flex'} alignItems="left">
          <Text {...poppinsText(false)}>SISTEM INFORMASI PENCATATAN PELANGGARAN</Text>
          <Text {...aliceText}>SMAN 1 BUKITTINGGI</Text>
          <Text {...poppinsText()}>SMAN 1 UNGGUL BUKITTINGGI</Text>
        </Stack>
      </Flex>
      <Spacer />
      <Flex>{children}</Flex>
    </Flex>
  );
};
type Props = { isLogin?: boolean };

export default TopBar;
