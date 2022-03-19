import React from 'react';
import { Stack, Flex, Text, Image } from '@chakra-ui/react';

const DefaultTopBar: React.FC = () => {
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
      display={{ base: 'none', md: 'flex' }}
      align="center"
      wrap="wrap"
      paddingX={4}
      paddingY={2}
      color="white"
      userSelect="none"
      height="8rem"
    >
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
  );
};

export default DefaultTopBar;
